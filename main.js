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

client.on('error', err => {
  console.log(err)
})




process.on('unhandledRejection', error => {
  console.log('Bot error:', error);
  client.guilds.fetch(config.logGuild).then(g => {
   g.channels.cache.get(config.logChannel).send('Bot Stopped, ERROR: ' + error).then(() => {   
    console.log('Process exiting')
    process.exit(1)})
    .catch(err => {console.log('here')})
  }).catch(err => console.log(err))
});

client.login(config.token)

