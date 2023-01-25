const db = require("../database/data.json");
const fs = require("fs");

const savedJSON = require("../database/write-json");

const productsController = {
  getProducts: (req, res) => {
    res.status(200).json({
      message: "products data fetched",
      result: db.products,
    });
  },
  addProduct: (req, res) => {
    const data = req.body;
    db.products.push(data);
    savedJSON(db);
    res.status(200).json({
      message: "new product added",
      result: data,
    });
  },
  editProduct: (req, res) => {
    const data = req.body;
    const id = req.params.id;

    const findIndex = db.products.findIndex((val) => {
      return val.id == id;
    });

    if (findIndex == -1) {
      res.status(400).json({
        message: "id not found",
      });
      return;
    }

    db.products[findIndex] = {
      ...db.products[findIndex],
      ...data,
    };

    savedJSON(db);
    res.status(200).json({
      message: "product edited",
      result: db.products[findIndex],
    });
  },
  deleteProduct: (req, res) => {
    const data = req.body;
    const id = req.params.id;

    const findIndex = db.products.findIndex((val) => {
      return val.id == id;
    });

    if (findIndex == -1) {
      res.status(400).json({
        message: "id not found",
      });
      return;
    }

    db.products.splice(findIndex, 1);

    savedJSON(db);
    res.status(200).json({
      message: "product deleted",
    });
  },
};

module.exports = productsController;
