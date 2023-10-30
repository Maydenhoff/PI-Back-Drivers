const axios = require("axios");
const { Driver, Team } = require("../db");


const postDriver = async(req, res) => {
    try {
        const { name, surname, description, image, nationality, dob, team } = req.body;
        if( !name || !surname || !description || !image || !nationality|| !dob || !team || !team.length) {
          console.log(req.body);
            return res.status(200).json({status:"faltan datos"})
        }
        console.log(team);
        let comprobarDriver = await Driver.count({where: {name:`${name} ${surname}`, nationality:nationality, dob: dob}})
        console.log("esto",comprobarDriver);
        
        console.log();
        if(comprobarDriver> 0) {
          return res.status(200).json({status:  "usuario_repetido"})
        } 



          let driver = await Driver.create({name:`${name} ${surname}`, description, image, nationality, dob})
          team.map( async(e) => {
            foundTeam = await Team.findAll({where: {name:e}})
            await driver.addTeam(foundTeam)
          })
          return res.status(200).json({...driver.dataValues, team: team})
    } catch (error) {
      console.log(error);
      return  res.status(500).json(error.message)
    }
   
  };
  
  module.exports = {
  
    postDriver,
  
  };