  const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[-] Komutlar yüklendi.`);
    client.user.setActivity(`🔥/yardım  /yetkili  /eğlence  /guard /istatatislik 🔥`, { type: "PLAYING"});
  client.user.setStatus("idle");
};