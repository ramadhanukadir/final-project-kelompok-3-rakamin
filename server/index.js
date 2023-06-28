const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const ItemsRoute = require("./routes/items");
const CategoriesRoute = require("./routes/categories");
const OrdersRoute = require("./routes/orders");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(ItemsRoute);
app.use(CategoriesRoute);
app.use(OrdersRoute);

app.get("/ping", (req, res) => {
  try {
    res.json({ ping: "success" });
  } catch (error) {
    console.log("something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
