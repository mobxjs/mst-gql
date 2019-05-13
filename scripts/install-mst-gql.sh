# Installs mst-sql in the current directory
# this file exists because of https://github.com/yarnpkg/yarn/issues/5357, once a tarball is installed, it is cached *FOREVER*
set -e -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
NR=`date "+%s"`

rm -rf node_modules/mst-gql
# yarn --cwd $DIR build
yarn --cwd $DIR/../ pack --filename mst-gql$NR.tgz
yarn add --ignore-scripts file:./mst-gql$NR.tgz
rm mst-gql$NR.tgz
