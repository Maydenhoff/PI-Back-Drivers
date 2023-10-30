const axios = require("axios");
const { Driver } = require("../db");
const getAllDrivers = require("../utils/getDriversUtil");


const deleteDriver = async(req, res) => {
    console.log("aca estoy");
    
    const { idDriver } = req.params
    const data = await Driver.findOne({where: {id:idDriver}})
    console.log(idDriver);
    try {
     Driver.destroy({
        where:{id: idDriver}
      })

      return res.status(200).json(data)
    } catch (error) {
        return res.status(400).send(error.message)
    }
    // await User.destroy({
    //     where: {
    //       firstName: "Jane"
    //     },
    //   });
}

module.exports = {
    deleteDriver,
  };
  