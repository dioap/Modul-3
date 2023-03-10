const db = require('../models');
const User = db.user;
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const secret = process.env.secret_key;

const authController = {
  register: async (req, res) => {
    const { email, password, username, isAdmin } = req.body;
    //cek email
    const isExist = await User.findOne({
      where: {
        [Op.or]: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (isExist) {
      res.status(400).json({
        message: 'this email is already registered',
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const data = {
      username: username,
      email: email,
      isAdmin: isAdmin,
      password: hashPassword,
    };

    const result = await User.create({ ...data });

    res.status(200).json({
      message: 'new user has been created',
      result: result,
    });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: 'user not found',
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid);
    if (!isValid) {
      return res.status(400).json({
        message: 'wrong password',
      });
    }

    const token = jwt.sign({ ...user }, secret, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'user login',
      result: token,
    });
  },

  editPassword: async (req, res) => {
    const { password, username } = req.body;
    const hashpassword = bcrypt.hashSync(password, 10);
    const result = await User.update(
      {
        password: hashpassword,
      },
      {
        where: {
          username: username,
        },
      }
    );
  },
};

module.exports = authController;
