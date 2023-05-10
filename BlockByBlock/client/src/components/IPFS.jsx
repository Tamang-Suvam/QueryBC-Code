import React, {useState } from 'react'
import client from '../ipfs';
import { Buffer } from 'buffer';

export const IPFS = () => {
    const [buffer, setBuffer] = useState(null);
    const [CID, setCID] = useState(null);
    
    const captureFile = (event) => {
        event.preventDefault()
        // const _file = event.target.files[0]
        // setFile(_file)
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          setBuffer(Buffer(reader.result))
        }
    }
    
    const onSubmit = async (event) => {
    event.preventDefault()

    client.add(buffer)
    .then( cid => {
      setCID(cid.path)
    })
    .catch( error => {
      console.error(error)
      alert("Error Uploading File! Did you select file to be uploaded?")
    })         
    }
    
  return (
    <div>
      <p>&nbsp;</p>
       <form className='form-control'>
       <input type="file" className='form-control fs-2' onChange={captureFile} />
       <div className="d-grid gap-2">
        <p>&nbsp;</p>
        <button type="submit" className="btn btn-outline-primary btn-lg btn-block fs-2" onClick={onSubmit}>Submit</button>
       </div>
      </form>
      <p>&nbsp;</p>
      {
        CID === null ? '' : <h1 className='fs-2 text-center text-success'>CID of the document: {CID}</h1>
      }
    </div>
  )
}

export default IPFS;