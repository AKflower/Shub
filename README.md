**Prerequisites**
<pre>https://hyperledger-fabric.readthedocs.io/en/release-2.5/prereqs.html</pre>

**Run network**
<pre>
cd test-network
./network.sh down
./network.sh up createChannel -c mychannel -ca -s couchdb
./network.sh deployCC -ccn basic -ccp ../shub/back-end/chaincode/ -ccl typescript
</pre>
**Run API**
<pre>
cd shub/back-end/api
npm install
npm run start
</pre>
