const axios = require("axios");
const { Driver } = require("../db");
const getAllDrivers = require("../utils/getDriversUtil");

const getDriverByName = async (req, res) => {
  let { name } = req.query;
  name = name.toLowerCase();
  name = name[0].toUpperCase() + name.slice(1, name.length);
  try {
    const data = await getAllDrivers()

    // console.log(data);

    const filterData = data.filter((e) => {
      let arrayName = e.name.split(" ");

      return arrayName[0] === name;
    });

    if(!filterData.length) {
      console.log("aca");
      return res.status(200).send("No se encontraron drivers con ese nombre")
    }
    if (filterData.length > 16) {
      let firstDrivers = filterData.slice(0, 15);
      return res.status(200).json(firstDrivers);
    } else {
      return res.status(200).json(filterData);
    }
 
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDriverByName,
};
