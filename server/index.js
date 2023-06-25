const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const customers = require("./routes/customersRoute");
const express = require("express");
const app = express();

app.use(customers);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
