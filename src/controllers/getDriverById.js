const axios = require("axios");
const { Driver } = require("../db");
const getAllDrivers = require("../utils/getDriversUtil");

const getDriverById = async (req, res) => {
  console.log("estoy aca");
  const { idDriver } = req.params;
  try {
    const data = await getAllDrivers()

    const findData = data.find((e) => {
      return e.id == idDriver;
    });
    if (findData) {
      return res.status(200).json(findData);
    } else {
      return res
        .status(200)
        .send("No se encontraron corredores con el id indicado");
    }

  
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDriverById,
};
