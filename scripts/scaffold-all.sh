#!/usr/bin/env bash
set -e -x
yarn build 

cd examples/1-getting-started 
yarn scaffold 

cd ../2-scaffolding 
yarn scaffold

cd ../3-using-subscriptions 
yarn scaffold

cd ../4-apollo-tutorial 
yarn scaffold

cd ../5-todos
# TODO: yarn scaffold

cd ../6-twitter-clone 
yarn scaffold