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

module.exports = checkPermission