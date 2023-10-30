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

    // const driverDataBase = await Driver.findOne({ where: { id: idDriver } })
    //   .then((response) => response.dataValues)
    //   .catch((e) => {});
    // if (driverDataBase?.name) return res.status(200).json(driverDataBase);
    // const { name, surname, description, image, nationality, dob } = await axios
    //   .get(`http://localhost:5000/drivers/${idDriver}`)
    //   .then((response) => response.data)
    //   .catch((e) => {
    //     return {};
    //   });

    // if (name) {
    //   return res.status(200).json({
    //     id: idDriver,
    //     name,
    //     surname,
    //     description,
    //     image,
    //     nationality,
    //     dob,
    //   });
    // } else {
    //   return res.status(200).send("No existen drivers con este ID")
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDriverById,
};
