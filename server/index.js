// const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const warehousesRoute = require('./routes/warehousesRoute');
const warehousesStockRoute = require('./routes/warehousesStockRoute');

const express = require('express');
const app = express();

app.use(express.json());
app.use(warehousesRoute);
app.use(warehousesStockRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
