var permissions = ["SEND_MESSAGES", "EMBED_LINKS"]

const axios = require('axios');
const checkPermission = require('../utils/checkPermission.js')

// https://vpic.nhtsa.dot.gov/api/Home
var apiEndpoint = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/"

function vinDecode(config, message, pureMsg){
  var hasPerms =  true
  permissions.forEach(function(p){
    if(!checkPermission(p, message.guild, message.channel)){
      console.log("Missing Permission: " + p)
      hasPerms = false
    }
  })
  if(!hasPerms){
    return
  }

  var vin = pureMsg.split(' ')[0]
  console.log(vin)

  axios.get(apiEndpoint + vin + "?format=json")
  .then(function(res){
    console.log(res.data)
    if(res.data.Results[1].Value != "0"){
      console.log("Error: " + res.data.Results[4].Value)
      message.channel.send("Error: " + res.data.Results[4].Value)
    } else{
      sendVehicleDateEmbed(res.data.Results, message)
    }
  })
  .catch(function(err){
    console.log(err)
  })

  
}

function sendVehicleDateEmbed(data, message){

  var vehicleObj = {
    manufacturer:{},
    engine: {}
  }

  // Year
  vehicleObj.year = data[9].Value ? data[9].Value : "*N/A*"
  // Make
  vehicleObj.make = data[6].Value ? data[6].Value : "*N/A*"
  // Model
  vehicleObj.model = data[8].Value ? data[8].Value : "*N/A*"
  // Series
  vehicleObj.series = data[11].Value ?  data[11].Value  : "*N/A*"
  // Vehicle Type 
  vehicleObj.vehicleType = data[13].Value ? data[13].Value : "*N/A*"
  // Body Class
  vehicleObj.bodyClass = data[21].Value ? data[21].Value : "*N/A*"
  // Manufacturing Plant
  vehicleObj.manufacturer.plantCountry = data[14].Value ? data[14].Value : "*N/A*"
  // Cylinders
  vehicleObj.engine.cylinders = data[68].Value ? data[68].Value : "*N/A*"
  // Displacement
  vehicleObj.engine.displacementLiters = data[71].Value ? data[71].Value + " Liters" : "*N/A*"
  // Brake Horsepower
  vehicleObj.engine.bhp = data[80].Value ? data[80].Value : "*N/A*"
  // Top Speed
  vehicleObj.topSpeed = data[86].Value ? data[86].Value : "*N/A*"
 // Transmission Style
    vehicleObj.transStyle = data[47].Value ? data[47].Value : "*N/A*"
  message.channel.send({
    embed: {
      color: 0x000000,
      title: `Vin Data`,
      description: ``,
      fields: [
        {
          name: '**Year / Make / Model / Series**',
          value: `${vehicleObj.year} ${vehicleObj.make} ${vehicleObj.model} ${vehicleObj.series}`
        },
        {
          name: '**Vehicle Type**',
          value: `${data[13].Value ? data[13].Value : "*N/A*"}`
        },
        {
          name: '**Body Class**',
          value: `${data[21].Value ? data[21].Value : "*N/A*"}`
        }, 
        {
          name: '**Manufacturing Plant Country**',
          value: `${data[14].Value ? data[14].Value : "*N/A*"}`
        },
        {
          name: '**Brake Horse Power**',
          value: `${vehicleObj.engine.bhp}`,
          inline: true
        },
        {
          name: '**Cylinders**',
          value: `${vehicleObj.engine.cylinders}`,
          inline: true
        },
        {
          name: '**Displacement**',
          value: `${vehicleObj.engine.displacementLiters}`,
          inline: true
        },
        {
          name: '**Top Speed**',
          value: `${vehicleObj.topSpeed}`,
        },
        {
          name: '**Transmission Style**',
          value: `${vehicleObj.transStyle}`,
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `Made by Apoc#4538`
      }
    }
  })
}

module.exports = vinDecode