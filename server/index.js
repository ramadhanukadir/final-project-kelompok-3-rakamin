const express = require("express");
const app = express();
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const router = require('./routes/index.Routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customers = require("./routes/customersRoute");
const users = require("./routes/usersRoute");
app.use(customers);
app.use(users);
app.use('/', router)
app.use("/assets", express.static("assets"));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app;