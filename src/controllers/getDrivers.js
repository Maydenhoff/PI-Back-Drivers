const axios = require("axios");
const { Driver, Team } = require("../db");
const { parseTeams } = require("../utils/parseTeams.js");
const getAllDrivers = require("../utils/getDriversUtil");

const getDrivers = async (req, res) => {
  try {
 
    const data = await getAllDrivers()
    // console.log(JSON.stringify(driverDataBase));

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//  'https://picsum.photos/700/400?random%27}; imagen ramdon

module.exports = {
  getDrivers,
};
