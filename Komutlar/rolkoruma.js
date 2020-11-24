const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix
if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komutu kullanabilmek için ancak Sunucu Sahibi Olmalısınız!')
  if (!args[0]) {
    const jaus0 = new Discord.RichEmbed()
      .setColor("GOLD")
      .setTitle("Rol Koruma sistemi!")
      .setDescription(
        "Komutu Hatalı Kullandınız ! > Komutun  Doğru Kullanımı : \`a!rolkoruma <aç/kapat>\`"
      );

    message.channel.send(jaus0);
    return;
  }
  let rol = await db.fetch(`rolk_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const jaus1 = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Rol Koruma sistemi!")
        .setDescription("**Dostum rol koruma zaten aktif durumda.**");

      message.channel.send(jaus1);
      return;
    } else {
      db.set(`rolk_${message.guild.id}`, "acik");
      const jaus2 = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Artemus Rol Koruma")
        .setDescription("**Rol koruma sistemi aktif edildi.**");

      message.channel.send(jaus2);
    }
  } else if (args[0] == "kapat") {
    db.delete(`rolk_${message.guild.id}`);
    const jaus3 = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTitle("Artemus Rol Koruma")
      .setDescription("**Rol Koruma Sistemi Kapatıldı.**");

    message.channel.send(jaus3);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = {
  name: "rolkoruma"
}; 