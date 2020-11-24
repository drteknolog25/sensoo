const Discord = require("discord.js");
const db = require ('quick.db')
 //EsadAtmacaYT
exports.run = (client, message, args) => {
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Bu komutu kullanmak için ``SUNUCUDAN YASAKLA` yetkisine sahip olmalısın!")
  let esadatmaca = message.mentions.users.first();
 //EsadAtmacaYT
  if(!esadatmaca) return message.channel.send("Banlanacak kişiyi etiketle.")  
  message.guild.ban(esadatmaca);
 //EsadAtmacaYT
  message.channel.send(`${esadatmaca} adlı kullanıcı sunucudan banlandı`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0  
};

exports.help = {
  name: 'ban',
  description: 'etiketlediğiniz kişiyi banlar',
  usage: 'ban'
}