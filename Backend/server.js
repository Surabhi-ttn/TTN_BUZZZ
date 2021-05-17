const express = require('express');
const app = express();
const mongoose = require("mongoose");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = 3000;

mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0.msvlm.mongodb.net/TTN?retryWrites=true&w=majority", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true" 
});

mongoose.connection.on("error", err => {
  console.log("err", err)
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
});
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "user API",
        description: "user API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis: ["index.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
 // Routes
/**
 * @swagger
 * /user:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.use('/', require('./routes'));

/**
 * @swagger
 * /users:
 *  put:
 *    description: Use to send all users
 *    responses:
 *      '201':
 *        description: A successful response
 */
  

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))