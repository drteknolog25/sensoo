const Discord = require("discord.js"); 
exports.run = async (client, message, args) => {

  let esadatmaca = args[0];
  if (isNaN(esadatmaca)) return message.reply("Doğru ID Girmelisiniz!");

  message.guild
    .ban(esadatmaca)
const esad = new Discord.RichEmbed()
  .setDescription(` \`${esadatmaca}\` Sunucudan Banlandı!`)
    message.channel.send(esad);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["fb"],
  permLevel: 2
};

exports.help = {
  name: "forceban"
};