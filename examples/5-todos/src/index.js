import * as React from 'react';
import ApolloClient from 'apollo-boost';

import { render } from 'react-dom';

import { TodoStore } from './TodoStore';
import { TodoListView } from './TodoListView';

const client = new ApolloClient({
  uri: 'https://api.graphcms.com/simple/v1/cjfmozsww0sn70146fdqyuhst'
});
const environment = { apolloClient: client, projectName: 'todo1' };

const store = TodoStore.create({}, environment);

render(<TodoListView store={store} />, document.getElementById('root'));
