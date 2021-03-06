const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
// ${prefix}
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new Discord.RichEmbed()
      .setDescription(`Doğru kullanım: \`${prefix}yavaşmod [0/120]\``)
      .setColor(message.guild.me.displayColor)
      .setTimestamp();
    message.channel.send({ embed });
    return;
  }
  if (limit > 120) {
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription("Süre limiti maksimum **120** saniye olabilir.")
        .setColor(message.guild.me.displayColor)
    );
  }
  message.channel.sendEmbed(
    new Discord.RichEmbed()
      .setDescription(
        `Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`
      )
      .setColor(message.guild.me.displayColor)
  );
  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", "yavasmod", "yavaşmod"],
  permLevel: 3
};

exports.help = {
  name: "yavaşmod",
  description: "Sohbete yazma sınır (süre) ekler.",
  usage: "yavaş-mod [1/120]"
};