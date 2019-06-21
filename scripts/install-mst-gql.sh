# Installs mst-gql in the current directory
# this file exists because of https://github.com/yarnpkg/yarn/issues/5357, once a tarball is installed, it is cached *FOREVER*
set -e

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/../"
DIR="$(realpath $BASE_DIR)"
NR=`date "+%s"`

rm -rf node_modules/mst-gql
mkdir -p node_modules/mst-gql
# yarn --cwd $DIR build

yarn --cwd $DIR pack --filename mst-gql$NR.tgz

tar zxf ./mst-gql$NR.tgz --strip-components=1 -C node_modules/mst-gql package

rm mst-gql$NR.tgz

echo "Installed mst-gql: $DIR => $(pwd)"