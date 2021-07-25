var permissions = ["SEND_MESSAGES", "EMBED_LINKS"]
const checkPermission = require('../utils/checkPermission.js')
function help(config, message){
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

  message.channel.send({
    embed: {
      color: 0x000000,
      title: `Car Bot Help`,
      description: `This bot is currently still in development.`,
      fields: [
        {
          name: 'Getting Colors',
          value: `use ${config.prefix}colors to see the available name colors.`
        },
        {
          name: 'Settings Color',
          value: `use ${config.prefix}color <color name> to set your name color. Ex: ${config.prefix}color blue`
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `Made by Apoc#4538`
      }
    }
  })
}

module.exports = help