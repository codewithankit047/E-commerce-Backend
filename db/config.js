const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose
    .connect("mongodb://127.0.0.1:27017/shopNip", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
