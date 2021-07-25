const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const messageEvent = require("./events/message.js")

client.on('ready', () => {
  console.log('Started')
  client.user.setActivity(`${config.prefix}help for help`)
})


client.on('message', async message => {
  messageEvent(client, config, message)
})


client.login(config.token)



function checkPermission(permission, guild, channel){
  if(channel){
    if(guild.me.permissionsIn(channel).has(permission)){
      return true
    } else{
      return false
    }
  } else{
    if(guild.me.hasPermission(permission)){
      return true
    } else{
      return false
    }
  }

}