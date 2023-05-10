const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const auth = require("./auth");

// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  // next();
});

// require database connection 
const dbConnect = require("./db/dbConnect");
const Index = require("./db/indexModel");

// execute database connection 
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


// register endpoint
app.post("/transaction-details", (request, response) => {
    const transactionInfo = new Index({
      address: request.body.address,
      blockNumber: request.body.blockNumber,
      transactionHash: request.body.transactionHash
    });

    // save the new user
    transactionInfo.save()
      // return success if the new user is added to the database successfully
      .then((result) => {
        response.status(201).send({
          message: "Created Successfully",
          result,
        });
      })
      // catch error if the new user wasn't added successfully to the database
      .catch((error) => {
        response.status(500).send({
          message: "Error creating index, transaction hashes needs to be unique!",
          error,
        });
      });
});

app.get("/block-details/:address", (request, response) => {
  Index.find({address: request.params.address}, function (err, info){
    if(err){
      response.status(404).send({
        message: "Address not found",
        e,
      });
    }
    else {
      response.status(200).json({
      status: 'success',
      message: {
        Info: info
      }
    });
    }
  });
});

module.exports = app;
