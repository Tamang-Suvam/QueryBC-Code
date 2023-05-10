

// // Connect to the MongoDB server
// const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';
// client.connect();

// // Iterate through each query and execute it against the database
// for (const line of lines) {
//   // Skip empty lines
//   if (!line.trim()) continue;

//   // Parse the query from the line
//   const query = JSON.parse(line);

// //   console.log(query)
//   // Execute the query against the database
//   const collection = client.db('bigchain').collection('assets');
//   const result = await collection.find(query).toArray();

//   // Log the result to the console
//   console.log(result);
// }

// // Disconnect from the MongoDB server
// client.close();


const { MongoClient } = require('mongodb');
const fs = require('fs');
const readline = require('readline');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';
const client = new MongoClient(url);

// Database Name
const dbName = 'bigchain';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('assets');

  let res = await processLineByLine(collection)
}

// async function processLineByLine(collection) {
//     // Read the file of queries
//     const file = fs.readFileSync('/home/suvam/Documents/QueriesFile/For MongoDB/queries.txt', 'utf8');

//     // Split the file into lines
//     const lines = file.split('\n');
//     for await (const line of lines) {
//         // Skip empty lines
//         if (!line.trim()) continue;
    
//         // Parse the query from the line
//         const query = JSON.parse(line);
    
//         // Execute the query against the database
//         // const collection = client.db('bigchain').collection('assets');
//         const result = await collection.find(query).toArray();
    
//         // Log the result to the console
//         // console.log(result);
//     }
// }

async function processLineByLine(collection) {
    const fileStream = fs.createReadStream('/home/suvam/Documents/QueriesFile/For MongoDB/queries.txt', 'utf8');
    let findResult = []
    let result = []
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    let start = performance.now()
    for await (let line of rl) {
      // console.time("In")
    //   const query = JSON.parse(line);
    //   console.log(query)
      console.log(typeof line)
      const findResult = await collection.find({'data.Patient ID': line}).toArray();
      console.log(findResult)
    //   for(let i = 0; i < findResult.length; i++) {
    //     let blockNumber = findResult[i].blockNumber
    //     let blockContents = await web3.eth.getBlock(blockNumber)
        
    //     for(let j = 0; j < await blockContents.transactions.length; j++) {
    //       let transactionObject = await web3.eth.getTransaction(blockContents.transactions[j])
          
    //       if(transactionObject.to === findResult[i].address) {
    //         result.push(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)))
    //       }
    
    //     }
    //   }
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