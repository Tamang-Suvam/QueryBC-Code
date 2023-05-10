const BigchainDB = require('bigchaindb-driver')

const API_PATH = 'http://localhost:9984/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

const bip39 = require('bip39')

export async function generateKeyPair(seed) {
    const buffer = bip39.mnemonicToSeedSync(seed).slice(0,32)
    const keyPair = new BigchainDB.Ed25519Keypair(buffer)
    return [conn, keyPair]
}

// export async function storeInBCDB(cid, patientID, patientName, doctorID, doctorName, symptoms, diagnosis, department, timeAdded) {
//     const keyPair = generateKeyPair('SaiRam')
//     const condition = BigchainDB.Transaction.makeEd25519Condition(keyPair.publicKey, true);

//     const output = BigchainDB.Transaction.makeOutput(condition);
//     output.public_keys = [keyPair.publicKey];

//     const asset = {
//         'CID': cid,
//         'Patient ID': patientID,
//         'Patient Name': patientName,
//         'Doctor ID': doctorID,
//         'Doctor Name': doctorName,
//         'Symptoms': symptoms,
//         'Diagnosis': diagnosis,
//         'Department': department,
//         'Time Added': timeAdded
//     };
//     const metadata = {
//         'bc_data': Math.random(0, 1)
//     };

//     const transaction = BigchainDB.Transaction.makeCreateTransaction(
//         asset,
//         metadata,
//         [output],
//         keyPair.publicKey
//     );

//     const txSigned = BigchainDB.Transaction.signTransaction(transaction, keyPair.privateKey);

//     try {
//         let tx = await conn.postTransaction(txSigned)
//         alert("transaction hash: "+tx.id)
//         return tx
//     } catch (error) {
//         console.error(error);
//         return false
//     }
// }
