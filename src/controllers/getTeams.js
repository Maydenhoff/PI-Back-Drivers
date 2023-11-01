const axios = require("axios");
const { Team } = require("../db");
const getAllDrivers = require("../utils/getDriversUtil");

const getTeams = async (req, res) => {
  try {
    const data  = await getAllDrivers()

let array = []
    for (let i = 0; i < data.length; i++) {
     
         if (data[i].teams) {
          data[i].teams.map(async(e) => {
            if(!array.includes(e)) {
              array.push(e)
            }
            await Team.findOrCreate({where: {name: e.trim()}})
          })


      }
    }
    return res.status(200).json(array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getTeams,
};
