const Discord = require('discord.js')

exports.run = function(client, message, args) {
  
  
const Ottoman = new Discord.MessageEmbed() 
                            
.setTitle("EsadAtmacaYT")
.setDescription("**Botun Davet Linki :** [Davet Et](https://discord.com/api/oauth2/authorize?client_id=759017300178501633&permissions=8&scope=bot)\n**Botun Destek Sunucusu :** [Katıl](https://discord.gg/8jPQMHY)")
.setColor("GREEN")

return message.channel.send(Ottoman)
}

exports.conf = {
enabled: false,
guildOnly: false,
aliases: [""],
permLevel: 0
  
};
  
exports.help = {
name: 'davet'
};