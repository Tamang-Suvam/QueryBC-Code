const Web3 = require('web3')
const rpcURL = 'HTTP://127.0.0.1:7545' 
const web3 = new Web3(rpcURL)
require('dotenv').config();

const account1 = '0xD21Fb1f1E1858481BfE1189066F348C3743a7608'
const account2 = '0xD94c72016AE885b31798849f00dA9E47C4EB1b07'
const { privateKey } = process.env
// const privateKey1 = Buffer.from(privateKey, 'hex');
// web3.eth.signTransaction({
//     from: account1,
//     gasPrice: "20000000000",
//     gas: "21000",
//     to: account2,
//     data: ""
// }).then(console.log);



// web3.eth.getTransactionCount(account1, (err, txCount) => {
//     // Build the transaction
//     const txObject = {
//       nonce:    web3.utils.toHex(txCount),
//       from:     account1,
//       to:       account2,
//       gasLimit: web3.utils.toHex(100000),
//     //   gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//       data: web3.utils.utf8ToHex(JSON.stringify({ a: 1, b: 2 }))
//     }
  
    
  //   web3.eth.accounts.signTransaction(txObject, privateKey, (err, res)=> {
  //       web3.eth.sendSignedTransaction(res.rawTransaction, function(error, hash) {
  //       if (!error) {
  //           console.log("🎉 The hash of your transaction is: ", hash);
  //       } else {
  //           console.log("❗Something went wrong while submitting your transaction:", error)
  //       }
  //       });
  //   })
  // })

// web3.eth.getTransaction('0xcf9bb6d3ce3cd47ab62f87db87ef51da6b9b0d17ba2aa7fe50bb5af3aaf58f95', (err, res)=> {
//     let data = JSON.parse(web3.utils.hexToUtf8(res.input))
//     console.log(data)
// })

// let totalTransactions = 0
// for(var i=1; i <= 118; i++){
//   web3.eth.getBlockTransactionCount(i).then(res => {
//     totalTransactions += res;
//   })
//   console.log(totalTransactions)
// }

// const toAddress = '0xD94c72016AE885b31798849f00dA9E47C4EB1b07';
// // const bloomFilter = web3.utils.soliditySha3([toAddress], []);
//   for(let blockNumber = 1; blockNumber < 121; blockNumber++) {
//     web3.eth.getBlock(blockNumber, function(error, block){
//       if (!error){
//         block.transactions.forEach(function(txHash){
//           web3.eth.getTransactionReceipt(txHash, function(error, receipt){
//             if (!error){
//               if(web3.utils.toChecksumAddress(receipt.to) === toAddress) {
//                 console.log(`Transaction found in block ${blockNumber}`);
//               }
//             }
//           });
//         });
//       }
//     });
// }

// const Web3 = require('web3');
// const web3 = new Web3('https://mainnet.infura.io/v3/<your-infura-project-id>');





const { BloomFilter } = require('bloom-filters');

// // // Define the filter parameters
// // const items = ['0x6ea8882e39cae739c60acd2c3f5ae00834957d074595492fb645472aea12e1f1', '0x6ea8882e39cae739c60acd2c3f5ae00834957d074595492fb645472aea12e1f2']; // Array of items to filter
// const filterSize = 2048; // Size of the filter in bits
// const numHashes = 8; // Number of hash functions to use

// // Create the bloom filter
// const bloomFilter = new BloomFilter(filterSize, numHashes);
// // items.forEach(item => {
// //   bloomFilter.add(item);
// // });

// // const blockNumber = 1;
// // web3.eth.getBlock(blockNumber, true).then((block) => {
// //   block.transactions.some((tx) => console.log(bloomFilter.has(tx.hash)));
// // })
// // // const hasMatch = 
// // Add the transaction hash to the bloom filter
// let txHash = '0xb161b8603c551fc1fe7220d240cc867a0a71890be05e4bf6fd215e681e660596'
// bloomFilter.add(txHash);
// // console.log(bloomFilter)

// // Get the block number range to search
// const startBlockNumber = 1;

// const txHashBN = web3.utils.toBN(txHash);

// // const isIncluded = logsBloomBN.and(txHashBN).eq(txHashBN);

// // console.log(`Transaction hash ${txHash} is ${isIncluded ? 'included' : 'not included'} in block ${blockNumber}`);

// web3.eth.getBlockNumber().then((endBlockNumber) => {
//   // Iterate over the block range and check if the transaction hash is present in each block's bloom filter
//   for (let blockNumber = startBlockNumber; blockNumber <= endBlockNumber; blockNumber++) {
//     web3.eth.getBlock(blockNumber).then((block) => {
//       // block.transactions.some((tx) => {
//         // if(bloomFilter.has(tx.hash)) {
//           // console.log(`Transaction may be present in block ${blockNumber}`);
//         // } else {
//         //   console.log(`Transaction is not present in block ${blockNumber}`);
//         // }
//       // })
//       // Check if the transaction hash is present in the block's bloom filter
//       let logsBloomBN = web3.utils.toBN(block.logsBloom);
//       if (bloomFilter.has(block.logsBloom)) {
//         // Transaction is possibly present in this block, further checks are required to confirm
//         console.log(`Transaction may be present in block ${blockNumber}`);
//       } else {
//         // Transaction is not present in this block
//         console.log(`Transaction is not present in block ${blockNumber}`);
//       }
//     })
//   }
// })


const txHash = "0xb161b8603c551fc1fe7220d240cc867a0a71890be05e4bf6fd215e681e660596"; // the transaction hash you want to check
const blockNumber = 120; // the block number you want to check

// create a bloom filter for the transaction hash
const bloomFilter = new BloomFilter(256, 16);
bloomFilter.add(txHash);

// get the block and check if the bloom filter contains the transaction hash
web3.eth.getBlock(blockNumber, (err, block) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(block.logsBloom)
  if (bloomFilter.has(block.logsBloom)) {
    console.log(`Transaction ${txHash} is present in block ${blockNumber}`);
  } else {
    console.log(`Transaction ${txHash} is NOT present in block ${blockNumber}`);
  }
});