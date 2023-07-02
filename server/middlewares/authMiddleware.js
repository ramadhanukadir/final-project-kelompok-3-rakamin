const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }

    const user = jwt.verify(token, process.env.JWT_SECRETKEY);
    const foundUsers = await Users.findOne({
      where: { id: user.userId },
    });

    if (!foundUsers) {
      throw { name: "error not found" };
    }

    req.loggedUser = {
      id: foundUsers.id,
      first_name: foundUsers.first_name,
      last_name: foundUsers.last_name,
      username: foundUsers.username,
      email: foundUsers.email,
    };

    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = authMiddleware;
