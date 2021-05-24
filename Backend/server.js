const express = require('express');
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
app.use(cors());
const port = 9000;

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

app.use('/', require('./routes'));

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))