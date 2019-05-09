import gql from 'graphql-tag';
import { types, getSnapshot, flow, applySnapshot, addDisposer, onSnapshot, getEnv } from 'mobx-state-tree';

/**
 * This function creates a type that can store itself in a graphQL.
 * It will automatically save it's new state in graphQL when any property changes
 *
 * The type exposes:
 * - id property
 * - save() action
 * - remove() action
 *
 * Parameters:
 * - modelName: The name of the type in the graphQL backend
 *
 * Environment:
 * - apolloClient: the apollo client to use to connect to the back-end
 * - projectName: the graphql document to work on
 */
export function createMutableGQLModel(modelName) {
  return types
    .model({
      id: types.optional(types.string, () => '' + Math.random()) // pseudo key
    })
    .actions(self => {
      const { apolloClient, projectName } = getEnv(self);
      return {
        afterAttach() {
          addDisposer(self, onSnapshot(self, self.save));
        },
        remove() {
          apolloClient.mutate({
            variables: { id: self.id },
            mutation: gql`
              mutation ${projectName}($id: ID!) {
                  delete${modelName}(id: $id) {
                      id
                  }
              }
          `
          });
        },
        save: flow(function*() {
          const snapshot = getSnapshot(self);
          const params = Object.keys(snapshot)
            .map(key => `${key}: ${JSON.stringify(snapshot[key])}`)
            .join(', ');
          yield apolloClient.mutate({
            mutation: gql`
              mutation ${projectName} {
                  update${modelName}(${params}) {
                      id
                  }
              }
          `
          });
        })
      };
    });
}

/**
 * This function creates a collection that will sync with graphQL.
 * It will automatically save it's new state in graphQL when any property changes
 *
 * The type exposes:
 * - a collection under the given name
 * - add() action
 * - load() action to forcefully fetch data
 *
 * Parameters:
 * - collectionProperty: the name of the property that will contain the property.
 * - itemType: a model type to be stored in the collection
 * - modelName: the name of the model in the graphQL backend
 * - queryName: the query to fetch the collection data with
 *
 * Environment:
 * - apolloClient: the apollo client to use to connect to the back-end
 * - projectName: the graphql document to work on
 */
export function createGQLCollectionType(collectionProperty, itemType, modelName, queryName) {
  return types
    .model({
      [collectionProperty]: types.optional(types.array(itemType), [])
    })
    .actions(self => {
      const { apolloClient, projectName } = getEnv(self);
      const watchQuery = apolloClient.watchQuery({
        pollInterval: 5000,
        query: gql`
          query ${projectName} {
              ${queryName} {
                  id
                  title
                  done
              }
          }
      `
      });
      const subscription = watchQuery.subscribe({
        next(result) {
          self.updateFromServer(result.data[queryName]);
        },
        error(err) {
          console.error('error', err);
        }
      });

      return {
        add: flow(function*(snapshot) {
          if (!itemType.is(snapshot)) {
            throw new Error('Invalid instance: ' + JSON.stringify(snapshot));
          }
          self[collectionProperty].push(snapshot); // Optimistic update, will be gone...

          const params = Object.keys(snapshot)
            .filter(key => key !== 'id')
            .map(key => `${key}: ${JSON.stringify(snapshot[key])}`)
            .join(', ');
          yield apolloClient.mutate({
            mutation: gql`
              mutation ${projectName} {
                  create${modelName}(${params}) {
                      id
                  }
              }
          `
          });
        }),
        load: flow(function*() {
          const data = yield watchQuery.result();
          self.updateFromServer(data.data[queryName]);
        }),
        updateFromServer(data) {
          applySnapshot(self.todos, data);
        },
        beforeDestroy() {
          watchQuery.stopPolling();
          subscription.unsubscribe();
        }
      };
    });
}
