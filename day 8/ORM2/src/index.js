const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const db = require('./models');
const User = db.User;
// User.sync({ alter: true });

app.post('/users', async (req, res) => {
  const { firstName, lastName, address } = req.body;
  const result = await User.create({
    firstName: firstName,
    lastName: lastName,
    address: address,
  });
  console.log(result);
  res.send(result);
});

app.get('/users', async (req, res) => {
  const result = await User.findAll();
  console.log(result);
  res.send(result);
});

app.listen(PORT, () => {
  console.log('app is running');
});
