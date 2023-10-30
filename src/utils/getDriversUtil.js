const { default: axios } = require("axios");
const { parseTeams } = require("./parseTeams");
const { Driver, Team } = require("../db");


async function getAllDrivers(){

    let drivers = [];
    const { data } = await axios.get("http://localhost:5000/drivers");

    for (let i = 0; i < data.length; i++) {
      const driver = {
        id: data[i].id,
        name: `${data[i].name.forename} ${data[i].name.surname}`,
        image: data[i].image,
        dob: data[i].dob,
        nationality: data[i].nationality,
        teams: data[i].teams ? parseTeams(data[i].teams) : [],
        description: data[i].description,
      };

      if (!driver.image.url.length) {
        driver.image.url =
          "https://cdn-images.motor.es/image/m/694w.webp/fotos-noticias/2020/03/que-coche-es-rayo-mcqueen-202066150-1585635516_1.jpg";
        driver.image.imageby = "By Cars cambiadoo";
      }
      drivers.push(driver);
    }
    const driverDataBase = await Driver.findAll({
      include: { model: Team}
    }).then((drivers) => {
      // Procesa los resultados para obtener un array de nombres
      return drivers.map((driver) => {
        const teamNames = driver.Teams.map((team) => team.name);
        return {
          id:driver.id,
          name:driver.name,
          description:driver.description,
          image:driver.image,
          nationality: driver.nationality,
          dob: driver.dob,
          teams: teamNames, // Aquí está el array de nombres de los equipos
        }
      })
    })

    return [...drivers, ...driverDataBase]
} 

module.exports = getAllDrivers