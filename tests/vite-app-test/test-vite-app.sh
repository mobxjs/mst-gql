#!/usr/bin/env bash
#
# This generates a vite project to test e2e use of mt-gql.
#
# Creates a new vite app with the latest version of mst-gql dependencies added to it. An mst model is generated using
# the graphql schema copied from examples/6-scaffolding-ts-hasura/schema.graphql and then the app is run to
# see if it can run all right.
#
#

# Navigate into the current directory so that nothing explodes
cd "${0%/*}"

ROOTDIR=`realpath ../../`

# Pack the lib, so that we can use it just like as if it was downloaded form npm
cd $ROOTDIR
npm pack
LIB_TGZ=`echo $PWD/"$(npm pkg get name | tr -d '"')-$(npm pkg get version | tr -d '"').tgz"`

cd $TMPDIR

# Cleanup and create a fresh directory to work with
rm -rf vite-tmp
mkdir vite-tmp
cd vite-tmp
#open .

npm create vite@latest vite-app -- --template react-ts
cd  vite-app

cp $ROOTDIR/examples/6-scaffolding-ts-hasura/schema.graphql .

# Add dependencies
npm add mobx mobx-state-tree mobx-react graphql graphql-tag graphql-request typescript

# Add current mst-gql version as relative dependency
echo "************ npm add mst-gql@file:$LIB_TGZ"
npm add mst-gql@file:$LIB_TGZ

# Add some code to import the generated files
perl -0777 -pi.original -e 's|(import.*?./App.css.*?$)|\1\nimport {RootStore} from "./model/RootStore";\nconst rootStore = RootStore.create({})\nconsole.log(rootStore)\n|sm' src/App.tsx

# Make sure unused local vars ar not reported by tsc
perl -pi -e 's/"noUnusedLocals": true/"noUnusedLocals": false/g' tsconfig.json
#perl -i -pe 's/("compilerOptions": \{)/$1\n    "noImplicitAny": false,/' tsconfig.json

# now generate models
#npx ../../../../generator/mst-gql-scaffold.js --format ts --outDir src/model schema.graphql
echo "Generate mst-gql models"
npx mst-gql --format ts --outDir src/model schema.graphql

# Compile it
echo "Compile generated mst-gql models"
npx tsc --extendedDiagnostics

#perl -0777 -pi.original -e 's|(import.*?./App.css.*?$)|\1\nimportX {RootStore} from "./model/RootStore";\nconst rootStore = RootStore.create({})\nconsole.log(rootStore)\n|sm' src/App.tsx

# run the project and check if runs all right. Not sure how portable or exact this is, but seems to work
echo "Run project"
rm -f out
(npm run dev 2>&1 | tee out)&


echo -n "Checking if app runs all right "
for i in {1..7}
do
  # Failed to compile.
  failed=`egrep 'Failed|ERROR|npm ERR' out`
  if [[ ! -z ${failed} ]]; then
    echo
    echo "App failed to compile"
    pid=`ps -ef | grep tests/vite-test/vite-tmp/vite-app | grep -v grep | awk '{print $2}' -`
    kill -9 $pid > /dev/null 2>&1
    exit
  fi

  echo -n "."

  sleep 1
done

echo "App ran successfully!"
pid=`ps -ef | grep tests/vite-test/vite-tmp/vite-app | grep -v grep | awk '{print $2}' -`
kill -9 $pid > /dev/null 2>&1
exit
