const Web3 = require('web3')
// const rpcURL = `HTTP://127.0.0.1:7545`
const rpcURL = `https://rpc-mumbai.maticvigil.com` 
// const rpcURL = 'https://avalanche-fuji.infura.io/v3/1aff01f7bb3744c5a6a527c5c92fa296'
const web3 = new Web3(rpcURL)

const { MongoClient } = require('mongodb');
const fs = require('fs');
const readline = require('readline');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';
const client = new MongoClient(url);

// Database Name
const dbName = 'AuthServer';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('indexes');

  let res = await processLineByLine(collection)
  // return res
}

async function processLineByLine(collection) {
  const fileStream = fs.createReadStream('/home/suvam/Documents/QueriesFile/For Web3 Based/MixedQueries/Without Axios/100.txt');
  let findResult = []
  let result = []

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let start = performance.now()
  for await (let line of rl) {
    // console.time("In")
    findResult = await collection.find({address: line}).toArray();

    for(let i = 0; i < findResult.length; i++) {
      let blockNumber = findResult[i].blockNumber
      let blockContents = await web3.eth.getBlock(blockNumber)
      
      for(let j = 0; j < await blockContents.transactions.length; j++) {
        let transactionObject = await web3.eth.getTransaction(blockContents.transactions[j])
        
        if(transactionObject.to === findResult[i].address) {
          result.push(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)))
        }
  
      }
    }
    // console.timeEnd("In")
  }
  let end = performance.now()
  console.log(end - start + " ms")
  // return result
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
