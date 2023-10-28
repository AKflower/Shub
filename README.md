**Prerequisites**
https://hyperledger-fabric.readthedocs.io/en/release-2.5/prereqs.html
**Run network**
cd test-network
./network.sh down
./network.sh up createChannel -c mychannel -ca
./network.sh deployCC -ccn basic -ccp ../shub/back-end/chaincode/ -ccl typescript

**Run API**
cd shub/back-end/api
npm install
npm run start

