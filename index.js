const express = require("express");

const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.passw;
  resp.send(result);
});
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "No user Found" });
    }
  } else {
    resp.send({ result: "enter valid details" });
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/get-product/:id", async (req, resp) => {
  let products = await Product.find({ user_id: req.params.id });
  console.log(req.params.id);
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send("no result found ");
  }
});
app.delete("/product/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});
app.get("/product/:id", async (req, resp) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send("No data");
  }
});
app.put("/product/:id", async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (result) {
    resp.send(result);
  } else {
    resp.send("No data");
  }
});
app.get("/search/:key", async (req, resp) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { modal: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });
  if (result) {
    resp.send(result);
  } else {
    resp.send("No data");
  }
});

app.listen(5000);
