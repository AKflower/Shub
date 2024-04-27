#!/bin/sh

./network.sh down
./network.sh up createChannel -c mychannel -ca -s couchdb
./network.sh deployCC -ccn basic -ccp ../shub/back-end/chaincode/ -ccl typescript
