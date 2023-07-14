const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDB = async () => {
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
  const usersSchema = new mongoose.Schema(
    {}
    );
  const user = mongoose.model("user", usersSchema);
  const data = await user.find();
  console.log("data print", data);
};
connectDB();
// app.get("/", (req, resp) => {
//   resp.send("app is working");
// });

app.listen(5000);
