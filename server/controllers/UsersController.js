const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const path = require('path');

const loginUsers = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid Credential' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({ message: 'Invalid Credential' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRETKEY);

    return res.status(200).json({
      accessToken: token,
      dataUser: {
        id: user.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUsers = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const findUser = await Users.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    if (findUser)
      return res
        .status(400)
        .json({ message: 'Username or Email already exists' });

    const users = await Users.create({
      first_name,
      last_name,
      username,
      email,
      password: hashPassword,
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg',
    });

    if (!first_name || !last_name || !username || !email || !hashPassword)
      return res.status(400).json({ message: 'Bad request' });

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
  try {
    const { id } = req.loggedUser;
    const { first_name, last_name, username, email, oldPassword, newPassword } =
      req.body;

    const user = await Users.findOne({
      where: {
        id: id,
      },
    });

    let updatedUser = {
      first_name,
      last_name,
      username,
      email,
    };

    if (oldPassword) {
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (isPasswordMatch) {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        updatedUser = {
          ...updatedUser,
          password: hashPassword,
        };
      } else {
        return res.status(404).json({ message: 'Please Check Password' });
      }
    }

    if (req.file) {
      const imagePath = `http://localhost:${process.env.PORT}/${req.file.path}`;
      updatedUser = {
        ...updatedUser,
        image_url: imagePath,
      };
    }
    await Users.update(updatedUser, { where: { id: id } });
    return res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserLogin = async (req, res) => {
  try {
    const { id } = req.loggedUser;
    const user = await Users.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUsers,
  createUsers,
  getUsersById,
  updateUsers,
  getUserLogin,
};
