# this file exists because of https://github.com/yarnpkg/yarn/issues/5357, once a tarball is installed, it is cached *FOREVER*
set -e -x

NR=`date "+%s"`
rm -rf node_modules/mst-gql
yarn --cwd ../../../ build
yarn --cwd ../../../ pack --filename mst-gql$NR.tgz
yarn add file:./mst-gql$NR.tgz
rm mst-gql$NR.tgz
