const express=require("express");
const { OrderModel } = require("../Models/order.model");
const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  try {
    const order = await OrderModel.find();
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

orderRouter.post("/add", async (req, res) => {
    try {

        // const order =
            await OrderModel.insertMany(req.body);
    // await order.save();
    res.status(200).send({ msg: "Created order" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports={orderRouter}