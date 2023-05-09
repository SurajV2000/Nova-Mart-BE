const express = require("express");
const { PharmaModel } = require("../Models/pharma.model");
const pharmaRouter = express.Router();

pharmaRouter.get("/", async (req, res) => {

const queryObj = {};
const sortObj = {};
const { _sort,_order, brand_name, _limit, page } = req.query;
if (_sort) {
  if (_order == "asc") {
    sortObj[_sort] = 1;
  }
  if (_order == "desc") {
    sortObj[_sort] = -1;
  }
}
if (brand_name) {
  queryObj.brand_name = {$in:brand_name};
  // { $regex: brand_name, $options: "i" }
}
let Limit;
if (_limit) {
  Limit = _limit;
}

  try {
    let userdata = await PharmaModel.find(queryObj).sort(sortObj).skip((page-1)*Limit).limit(Limit);;
    res.status(200).send(userdata);
  } catch (error) {
    res.status(400).send({"msg":error.message})
  }
});

pharmaRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
  const data = await PharmaModel.findOne({ _id: id });
  res.status(200).send(data);
  } catch (error) {
    res.status(400).send({msg:error.message})
  }
})

pharmaRouter.post("/add", async (req, res) => {
      try {
        const data = await PharmaModel(req.body);
        await data.save();
        res.status(200).send({ msg: "Created Pharma" });
      } catch (error) {
        res.status(400).send({ msg: error.message });
      }
})

pharmaRouter.patch("/update/:ID", async (req, res) => {
    const id=req.params.ID
    try {
        await PharmaModel.findByIdAndUpdate({ _id: id },req.body);
        res.status(200).send("data IS BEEDN updated");
    } catch (error) {
        res.status(400).send(error);
    }
})

pharmaRouter.delete("/delete/:ID", async (req, res) => {
  const id = req.params.ID;
  try {
    await PharmaModel.findByIdAndDelete({ _id: id });
    res.status(200).send("data IS BEEDN deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { pharmaRouter };
