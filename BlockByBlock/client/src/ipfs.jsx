// import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { create } from 'ipfs-http-client'
// const ipfsClient = require('ipfs-http-client')

// const projectId = '2DKPh21wsRUiB27R526EOCo4eUV'
// const projectSecret = '1bc14260235b4fb8844b4d86b0113876'
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
// const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFjNTRmZjRjMTBGQTAzOGNjMzc2NTlFNjA1QzA0YkFEZDY0QzQ0MmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUwMzcyNDI5OTQsIm5hbWUiOiJRdWVyeV9FSFIifQ.Gpd2ktFpc3ebYLJHyhTIzSqIhRt-w0oIsY3usoctwEc' });
// const client = ipfsClient({
//   host: '127.0.0.1/tcp/',
//   port: 8080,
//   protocol: 'https',
//   apiPath: '/ipfs/api/v0'
  // headers: {
  //   authorization: auth,
  // },
// })

// const client = ipfsClient({url:"http://127.0.0.1:5001/api/v0"})
// connect using a URL
const client = create(new URL('http://127.0.0.1:5001/api/v0'))

// call Core API methods
// const { cid } = await client.add('Hello world!')
export default client
