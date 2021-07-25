const helpCommand = require("../commands/help.js")
function onMessage(client, config, message){
  if (message.author.bot) return

  if (message.content.indexOf(config.prefix) !== 0) return

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g)
  const command = args.shift().toLowerCase()

  if (!command) return

  if (command === 'help') {
    helpCommand(config, message)

  }



  // ALL COMMANDS BELOW REQUIRE ARGUMENTS
  // check for args
  if (!message.content.split(config.prefix + command)[1]) {
    return
  }
  let pureMsg = message.content
    .split(' ')
    .slice(1)
    .join(' ')
    .replace(/\@everyone/gi, 'everyone')
    .replace(/\@here/gi, 'here')
}

module.exports = onMessage