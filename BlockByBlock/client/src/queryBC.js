import axios from 'axios'
const Web3 = require('web3')
// const rpcURL = `HTTP://127.0.0.1:7545`
const rpcURL = `https://rpc-mumbai.maticvigil.com` 
// const rpcURL = 'https://avalanche-fuji.infura.io/v3/1aff01f7bb3744c5a6a527c5c92fa296'
const web3 = new Web3(rpcURL)
// const { MongoClient } = require('mongodb')

// // For connecting to the mongoDB database running at the backend
// async function connectAndFind(address) {
//   const link = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0'
//   const client = new MongoClient(link)
//   const dbName = 'AuthServer'

//   await client.connect();
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);
//   const collection = db.collection('indexes');

//   const findResult = await collection.find({address: address}).toArray();
//   console.log('Found documents =>', findResult);
// }
async function getNonce(account) {
  const txCount = await web3.eth.getTransactionCount(account);
  return txCount;
}

// export async function addPatientRecord(cid, doctorName, doctorID, patientName, patientID, symptoms, diagnostic, department, timeAdded, privateKey, i) {
//   // web3.eth.getTransactionCount(doctorID, async (err, txCount) => {
//     // let txCount = await web3.eth.getTransactionCount(doctorID)
//     // console.log(doctorID)
//     let txCount = await getNonce(doctorID) + i
//     // Building the transaction
//     // const d = new Date()
//     const txObject = {
//       // nonce:    web3.utils.toHex(txCount),
//       nonce:    await web3.utils.toHex(txCount),
//       to:       patientID,
//       gasLimit: web3.utils.toHex(100000),
//       data: web3.utils.utf8ToHex(JSON.stringify({ CID: cid,
//                                                   DoctorName: doctorName,
//                                                   DoctorID: doctorID,
//                                                   PatientName: patientName,
//                                                   PatientID: patientID,
//                                                   Symptoms: symptoms,
//                                                   Diagnostic: diagnostic,
//                                                   Department: department,
//                                                   TimeAdded: timeAdded })) //TimeAdded: d.getTime()
//     }
//     let res = await web3.eth.accounts.signTransaction(txObject, privateKey)
//     let txObj = await web3.eth.sendSignedTransaction(res.rawTransaction)
//     let txHash = txObj.transactionHash
//     let blockNumber = txObj.blockNumber
//     // console.log(txHash, blockNumber)
//     return [txHash, blockNumber]
//     // var receipt = web3.eth.getTransactionReceipt('0xa6646aeb6823b8700ce747a58c99be2b5931acb04f1e2329cdf3d085f02a8f0f')
// // .then(console.log);
//     // web3.eth.accounts.signTransaction(txObject, privateKey, (err, res)=> {
//     //   web3.eth.sendSignedTransaction(res.rawTransaction, function(error, hash) {
//     //   if (!error) {
//     //       console.log("🎉 The hash of the transaction is: ", hash);
//     //   } else {
//     //       console.log("❗Something went wrong while submitting the transaction:", error)
//     //   }
//     //   });
//     // })
//   // })
// }


export async function addPatientRecordsCSV(patientDataArray, privateKey) {
  // const address = await web3.eth.accounts.privateKeyToAccount(privateKey).address;
  const startingNonce = await web3.eth.getTransactionCount(patientDataArray[0].doctorId);
  const txObjects = [];

  
  for (let i = 0; i < patientDataArray.length; i++) {
    const { cid, doctorName, doctorId, patientName, patientId, symptoms, diagnostic, department, timeAdded } = patientDataArray[i];
    const txCount = startingNonce + i;
    // console.log(txCount)
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: patientId,
      gasLimit: web3.utils.toHex(100000),
      data: web3.utils.utf8ToHex(JSON.stringify({ 
        CID: cid,
        DoctorName: doctorName,
        DoctorID: doctorId,
        PatientName: patientName,
        PatientID: patientId,
        Symptoms: symptoms,
        Diagnostic: diagnostic,
        Department: department,
        TimeAdded: timeAdded 
      }))
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
    txObjects.push(signedTx.rawTransaction);
  }

  const receiptPromises = [];
  console.log("here")
  for (let i = 0; i < txObjects.length; i++) {
    const receiptPromise = await web3.eth.sendSignedTransaction(txObjects[i])
    receiptPromises.push(receiptPromise);
    console.log(i)
  }

  return Promise.all(receiptPromises);
}


// // The function below may be helpful if we use a database to store the specific transaction hashes
// async function isTransactionInBlock(blockNumber, txHash) {
//   const block = await web3.eth.getBlock(blockNumber);
//   const txHashes = block.transactions;
//   return txHashes.includes(txHash);
// }

// // Example of lazy loading
// const lazyGetBlock = async (blockNumber) => {
//   const block = await web3.eth.getBlock(blockNumber, false);
//   return {
//     number: block.number,
//     timestamp: block.timestamp,
//     hash: block.hash,
//   };
// };

// const getLatestBlocks = async (numBlocks) => {
//   const latestBlockNumber = await web3.eth.getBlockNumber();
//   const blocks = [];

//   for (let i = 0; i < numBlocks; i++) {
//     const blockNumber = latestBlockNumber - i;
//     blocks.push(lazyGetBlock(blockNumber));
//   }

//   return Promise.all(blocks);
// };

// (async () => {
//   const blocks = await getLatestBlocks(10);
//   console.log(blocks);
// })();

export async function findMePatientRecord(patientID) {
  let result = []
  let latestBlockNumber = await web3.eth.getBlockNumber()
  
  for(let i = 1; i <= latestBlockNumber; i++) {
    let blockContents = await web3.eth.getBlock(i)
    console.log('Checking Block No: ' + i)

    for(let j = 0; j < blockContents.transactions.length; j++) {
      let transactionObject = await web3.eth.getTransaction(blockContents.transactions[j])
      if(transactionObject.to === patientID) {
        result.push(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)))
      }
    }

  }
  return result
}

// export async function findMePatientRecordOnlyFromSpecificYear(patientID, year) {
//   let result = []
//   let latestBlockNumber = await web3.eth.getBlockNumber()
  
//   for(let i = 1; i <= latestBlockNumber; i++) {
//     let blockContents = await web3.eth.getBlock(i)
//     console.log('Checking Block No: ' + i)

//     if(blockContents.timestamp >= year)
//     for(let j = 0; j < blockContents.transactions.length; j++) {
//       let transactionObject = await web3.eth.getTransaction(blockContents.transactions[j])
//       if(transactionObject.to === patientID) {
//         result.push(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)))
//       }
//     }
    
//   }
//   return result
// }

// export async function findMePatientRecordFromSpecificDate(patientID, time) {
//   let result = []
//   let latestBlockNumber = await web3.eth.getBlockNumber()
  
//   for(let i = 1; i <= latestBlockNumber; i++) {
//     let blockContents = await web3.eth.getBlock(i)
//     for(let i = 0; i < blockContents.transactions.length; i++) {
//       let transactionObject = await web3.eth.getTransaction(blockContents.transactions[i])
//       if(transactionObject.to === patientID) {
//         if(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)).TimeAdded > time)
//           result.push(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)))
//       }
//     }
//   }
//   return result
// }

// export async function findInDB(address) {  
//   const configuration = {
//     method: "get",
//     url: `http://localhost:4000/block-details/${address}`,
//   }

//   let res = await axios(configuration)
//   .catch((error) => {
//     alert(error.response.data.message);
//   });
//   // console.log(res.data.message.Info.length)
//   await findMePatientRecordWithDB(res.data.message.Info)
// }

export async function findMePatientRecordWithDB(address) {
  let result = []

  const configuration = {
    method: "get",
    url: `http://localhost:4000/block-details/${address}`,
  }

  // let res = await axios(configuration)
  let res = await axios(configuration)
  .catch((error) => {
    alert(error.response.data.message);
  });

  let dbResult = res.data.message.Info
  
  for(let i = 0; i < dbResult.length; i++) {
    let blockNumber = dbResult[i].blockNumber
    let blockContents = await web3.eth.getBlock(blockNumber)
    
    for(let j = 0; j < await blockContents.transactions.length; j++) {
      let transactionObject = await web3.eth.getTransaction(blockContents.transactions[j])
      
      if(transactionObject.to === dbResult[i].address) {
        result.push(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)))
      }

    }

  }
  return result
}

// export async function findMePatientRecordWithDBFromSpecificDate(dbResult, time) {
//   let result = []

//   for(let i = 0; i < dbResult.length; i++) {
//     let blockNumber = dbResult[i].blockNumber
//     let blockContents = await web3.eth.getBlock(blockNumber)
    
//     for(let j = 0; j < blockContents.transactions.length; j++) {
//       let transactionObject = await web3.eth.getTransaction(blockContents.transactions[j])
      
//       if(transactionObject.to === dbResult[i].address) {
//         if(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)).TimeAdded > time)
//           result.push(JSON.parse(web3.utils.hexToUtf8(transactionObject.input)))
//       }

//     }

//   }
//   return result
// }

export async function findMePatientRecordFromSpecificDate(date, patientID) {
  const startDate = new Date('2023-01-14')
  // const startDate = new Date('Apr-05-2023 03:26:53 PM +UTC');
  // const startDate = new Date('2023-04-05T15:26:53.000Z'); 
  // const startDate = new Date('Jan 1, 2023');
  // Get the latest block number on the network

  let latestBlockNumber = await web3.eth.getBlockNumber()
  const blockTime = 2; // The average block time on the Mumbai Testnet (2 seconds)
  const genesisTimestamp = 1605696000; // The genesis timestamp for the Mumbai Testnet (Nov 18, 2020 at 12:00:00 AM UTC)
  const startBlock = Math.floor((startDate.getTime() / 1000 - genesisTimestamp) / blockTime);

  // console.log('startblock: '+ startBlock)
  console.log('latestblock: '+ latestBlockNumber)
  // console.log(latestBlockNumber - startBlock)

  for (let i = startBlock; i <= latestBlockNumber; i++) {
    console.log("Scanning Block No: " + i)
    let block = await web3.eth.getBlock(i)
    // console.log(block)
  }
  // web3.eth.getBlockNumber().then(latestBlockNumber => {
  //   // Calculate the block number to start from if a start date was given
  //   if (startDate) {
  //     const blockTime = 2; // The average block time on the Mumbai Testnet (2 seconds)
  //     const genesisTimestamp = 1605696000; // The genesis timestamp for the Mumbai Testnet (Nov 18, 2020 at 12:00:00 AM UTC)
  //     startBlock = Math.floor((startDate.getTime() / 1000 - genesisTimestamp) / blockTime);
  //   }

  //   // Fetch the blocks using the startBlock variable
  //   for (let i = startBlock; i <= latestBlockNumber; i++) {
  //     web3.eth.getBlock(i).then(block => {
  //       console.log(block);
  //     });
  //   }
  // });
}