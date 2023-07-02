const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './assets');
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname.toLowerCase().split(" ").join("-"))
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
});

router.get("/users/:id", usersController.getUsersById);
router.post("/users/register", usersController.createUsers);
router.post("/users/login", usersController.loginUsers);
router.put("/users/:id",upload.single("image_url"), usersController.updateUsers);


module.exports = router;