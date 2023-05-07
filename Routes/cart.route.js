const express = require("express");
const {  CartModel } = require("../Models/cart.model");
const cartRouter = express.Router();
 cartRouter.post("/add", async (req, res) => {
  try {
    const cart = new CartModel(req.body);
    await cart.save();
    res.status(200).send({ msg: "Created cart" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
 });

 cartRouter.get("/", async (req, res) => {
  try {
    const carts = await CartModel.find({ authorID: req.body.authorID });
    res.status(200).send(carts);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
 cartRouter.patch("/update/:cartID", async (req, res) => {
  const { cartID } = req.params;
  const cart = await CartModel.findOne({ _id: cartID });
  try {
    if (req.body.authorID !== cart.authorID) {
      res.status(200).send("You are not authorised for this");
    } else {
      await CartModel.findByIdAndUpdate({ _id: cartID });
      res.status(200).send("data IS BEEDN updated");
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
 cartRouter.delete("/delete/:cartID", async (req, res) => {
  const { cartID } = req.params;
  const cart = await CartModel.findOne({ _id: cartID });
  try {
    if (req.body.authorID !== cart.authorID) {
      res.status(200).send("You are not authorised for this");
    } else {
      await CartModel.findByIdAndDelete({ _id: cartID });
      res.status(200).send("carts IS BEEDN deleted");
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { cartRouter };
