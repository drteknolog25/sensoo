const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
exports.run = async(client, message, args) => {

  let Ottoman = args[0]

if (!Ottoman) {
  const Ottoman = new Discord.MessageEmbed()
  .setDescription('Kimin Banını Açcam İd Versene')
  return message.channel.send(s)
}
    

  
message.guild.members.unban(Ottoman);
 const s = new Discord.MessageEmbed()
  .setDescription(`${Ottoman} idli kişi ${message.author.tag} tarafından yasağı kaldırıldı`)
  return message.channel.send(Ottoman)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
}
exports.help = {
  name: "unban"
}