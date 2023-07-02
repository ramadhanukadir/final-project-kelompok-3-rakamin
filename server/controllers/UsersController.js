const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const path = require("path");

const loginUsers = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credential" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Invalid Credential" });
    }
    const token = jwt.sign(
      { userId: user.id, fName: user.first_name, lname: user.last_name },
      process.env.JWT_SECRETKEY
    );
    return res.status(200).json({ accessToken: token, userId: user.id });
  } catch (error) {
    console.log(error);
  }
};

const createUsers = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const users = await Users.create({
      first_name,
      last_name,
      username,
      email,
      password: hashPassword,
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg",
    });

    if (!first_name || !last_name || !username || !email || !hashPassword)
      return res.status(400).json({ message: "Bad request" });

    return res.status(201).json({ data: users });
  } catch (error) {
    console.log(error);
  }
};

const getUsersById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
  }
};

const updateUsers = async (req, res) => {
  const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;
  try {
    const { first_name, last_name, username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await Users.update(
      {
        first_name,
        last_name,
        username,
        email,
        password: hashPassword,
        image_url: imagePath,
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUsers,
  createUsers,
  getUsersById,
  updateUsers,
};
