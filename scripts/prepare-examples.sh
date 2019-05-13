#!/usr/bin/env bash
set -e -x
yarn build 

cd examples/1-getting-started 
yarn 

cd ../2-scaffolding 
yarn 

cd ../3-using-subscriptions 
yarn 

cd ../4-apollo-tutorial 
yarn 

cd ../5-todos
# yarn TODO

cd ../6-twitter-clone 
yarn 