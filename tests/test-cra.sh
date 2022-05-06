#!/usr/bin/env bash
#
# Creates a new CRA app with the latest version of mst-gql dependencies added to it. An mst model is generated using
# the graphql schema copied from examples/6-scaffolding-ts-hasura/schema.graphql and then the app is run to
# see if it can run all right.
#
#
# Note: the generated cra-test directory should not be checked into git. Unfortunately it cannot be added to .gitignore
# otherwise relative-deps won't work (it ignores files in .gitignore).
#

rm -rf cra-test

mkdir cra-test
cd cra-test

npx create-react-app cra-app --template typescript
cd cra-app
cp ../../../examples/6-scaffolding-ts-hasura/schema.graphql .
yarn add mobx mobx-state-tree mobx-react react react-dom mst-gql graphql-request
yarn add graphql graphql-tag
yarn add relative-deps

# Add current ms-gql version as relative dependency
# perl -0777 -pi.original -e 's|\}$|},\n  "relativeDependencies": {\n    "mst-gql": "../../../"\n  }|sm' package.json
npx relative-deps add ../../../

# Load mst-gql relative deps
node_modules/.bin/relative-deps

# Add some code to import the generated files
perl -0777 -pi.original -e 's|(import.*?./App.css.*?;)|\1\nimport {RootStore} from "./model/RootStore";\nconst rootStore = RootStore.create({})|sm' src/App.tsx

# now generate models
npx mst-gql --format ts --outDir src/model schema.graphql
# Compile it
npx tsc --extendedDiagnostics

# run the project and check if runs all right. Not sure how portable or exact this is, but seems to work
rm -f out
yarn start | tee ./out 2>&1 &

echo -n "Checking if app runs all right "
for i in {1..20}
do
  # Failed to compile.
  failed=`egrep 'Failed to compile|ERROR in' out`
  if [[ ! -z ${failed} ]]; then
    echo
    echo "App failed to compile"
    pid=`ps -ef | grep tests/cra-test/cra-app | grep -v grep | awk '{print $2}' -`
    kill -9 $pid > /dev/null 2>&1
    exit
  fi

  no_issues=`grep 'No issues found.' out | wc -l`
  if [ "$no_issues" -eq "1" ]; then
    echo
    echo "App ran successfully!"
    pid=`ps -ef | grep tests/cra-test/cra-app | grep -v grep | awk '{print $2}' -`
    kill -9 $pid > /dev/null 2>&1
    exit
  fi

  echo -n "."

  sleep 3
done

