const express = require("express");
const { ElectronicModel } = require("../Models/electronic.model");
const electronicRouter = express.Router();

electronicRouter.get("/", async (req, res) => {
const queryObj = {};
const sortObj = {};
const { price, brand_name, limit, page } = req.query;
if (price) {
  if (price == "asc" || price == "ASC") {
    sortObj.price = 1;
  } else if (price == "dsc" || price == "DSC") {
    sortObj.price = -1;
  }
}
if (brand_name) {
  queryObj.brand_name = { $regex: brand_name, $options: "i" };
}
let Limit = 0;
if (limit) {
  Limit = limit;
}

try {
  let userdata = await ElectronicModel.find(queryObj)
    .sort(sortObj)
    .skip((page - 1) * Limit)
    .limit(Limit);
  res.status(200).send(userdata);
} catch (error) {
  res.status(400).send({ msg: error.message });
}
});

electronicRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await ElectronicModel.findOne({ _id: id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

electronicRouter.post("/add", async (req, res) => {
  try {
    const data = new ElectronicModel(req.body);
    console.log(req.body)
    await data.save();
    res.status(200).send({ msg: "Created Electronics" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

electronicRouter.patch("/update/:ID", async (req, res) => {
  const id = req.params.ID;
  try {
    await ElectronicModel.findByIdAndUpdate({ _id: id });
    res.status(200).send("data IS BEEDN updated");
  } catch (error) {
    res.status(400).send(error);
  }
});

electronicRouter.delete("/delete/:ID", async (req, res) => {
  const id = req.params.ID;
  try {
    await ElectronicModel.findByIdAndDelete({ _id: id });
    res.status(200).send("data IS BEEDN deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { electronicRouter };
