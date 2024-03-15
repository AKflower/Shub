
<div align="center"><img width="706" alt="Logo" src="https://github.com/AKflower/Shub/assets/89245858/7ec7c235-6372-49df-baf5-91d89ed1b029"></div>

  
## Introduction
<p>"Shub" is short for Secret Hub. Shub aims to provide ogranizations with a secure, transparent, and cost-effective storage space based on the Blockchain and IPFS.</p> 

## Installation
**Prerequisites**
<pre>https://hyperledger-fabric.readthedocs.io/en/release-2.5/prereqs.html</pre>

**Run network**
<pre>
cd test-network
./network.sh down
./network.sh up createChannel -c mychannel -ca -s couchdb
./network.sh deployCC -ccn basic -ccp ../shub/back-end/chaincode/ -ccl typescript
</pre>
**Run IPFS**
<pre>
cd ipfs-network
docker-compose down
docker-compose up
</pre>
**Run API**
<pre>
cd shub/back-end/api
npm install
npm run start or npm run start:dev (for hot reload)
</pre>
**Run Front-end**
<pre>
cd shub/front-end
npm install
npm run dev

</pre>
