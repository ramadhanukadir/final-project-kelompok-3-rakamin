const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');
const upload = require('../middlewares/uploadPhoto');

router.get('/:id', usersController.getUsersById);
router.get('/', usersController.getUserLogin);
router.post('/register', usersController.createUsers);
router.post('/login', usersController.loginUsers);
router.put('/', upload.single('image_url'), usersController.updateUsers);

module.exports = router;
