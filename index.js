const express = require("express");
const { connection } = require("./db");
const { cartRouter } = require("./Routes/cart.route");
const { userRouter } = require("./Routes/user.route");
const { auth } = require("./Middlewares/auth.middleware");
const { pharmaRouter } = require("./Routes/pharma.route");
const { electronicRouter } = require("./Routes/electronic.route");
const { orderRouter } = require("./Routes/order.route");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/pharma", pharmaRouter);
app.use("/electronic", electronicRouter);
app.use("/order",orderRouter)
app.use(auth);
app.use("/cart", cartRouter);


app.listen(5050, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is runing at 5050");
});
