const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const customers = require("./routes/customersRoute");
const users = require("./routes/usersRoute");
const express = require("express");
const app = express();
const router = require('./routes/index.Routes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customers);
app.use(users);
app.use('/', router)
app.use("/assets", express.static("assets"));




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app;