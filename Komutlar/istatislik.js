const Discord = require("discord.js");
const moment = require("moment");
const ayarlar = require("../ayarlar.json");
const os = require("os");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  const duration = moment
    .duration(client.uptime)

    .format(" D [gün], H [saat], m [dakika], s [saniye]");
//Code Universe
 //Code Universe
  let aylartoplamı = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let naberfıstık = aylartoplamı;
//Code Universe
 //Code Universe
  let s = `${moment(client.user.createdAt).format("DD")} ${
    naberfıstık[moment(client.user.createdAt).format("MM")]
  } ${moment(client.user.createdAt).format("YYYY HH:mm:ss")}`;

  const codeuniverse = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setFooter(client.user.tag, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setTitle(`Valiant | Kurumsal İstatistik Bilgileri`)
    .addField(
      "**Botun Ana Sahipleri:**",
      "<@548000719647801357>|&|<@488296895027085323>|&|<@413612627017859072>"
    )
    .addField(
      "**Botun Geliştiricileri:**",
      "<@643829563310342154>|&|<@704992247468523603>"
    )
    .addField(
      "**Hizmet Verdiği Kullanıcı Sayısı:**",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      false
    )
    .addField(
      "**Hizmet Verdiği Sunucu Sayısı:**",
      client.guilds.cache.size.toLocaleString(),
      false
    )
    .addField(
      "**Hizmet Verdiği Kanal Sayısı:**",
      client.channels.cache.size.toLocaleString(),
      false
    )
    .addField("**Discord.JS sürüm:**", "v" + Discord.version, false)
    .addField("**Node.JS sürüm:**", `${process.version}`, false)
    .addField("**Ping:**", client.ws.ping + " ms", false)

    .addField("**Uptime Süresi**", duration)
    .addField("**Botun Kuruluş Tarihi**", s);
  return message.channel.send(codeuniverse);
};
//Code Universe
 //Code Universe
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "botbilgi"],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "",
  usage: "istatistik"
};
