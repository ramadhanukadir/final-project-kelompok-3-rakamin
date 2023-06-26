const express = require('express')
const app = express();

const router = require('./routes/index.Routes')

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express())
app.use('/', router)


const PORT = process.env.PORT;




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app;