const axios = require("axios");
const { Team } = require("../db");
const { parseTeams } = require("../utils/parseTeams");

const getTeams = async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:5000/drivers");
    const array = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].teams) {
        let t = parseTeams(data[i].teams);
        for (let j = 0; j < t.length; j++) {
          await Team.findOrCreate({ where: { name: t[j] } });

          if (!array.includes(t[j])) {
            array.push(t[j]);
          }
        }
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
