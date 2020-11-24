const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komutu kullanabilmek için ancak Sunucu Sahibi Olmalısınız!')
  if (!args[0]) return message.channel.send(`Komutu Hatalı Kullandınız ! Komutun  Doğru Kullanımı : \`a!emojikoruma <aç/kapat>\``)
  
  // Code Universe
  if (args[0] == 'aç') { 
        if (db.fetch(`emojikoruma_${message.guild.id}`) === true) return message.channel.send('Emoji Koruma İşlemi Daha Önceden Açıkmış,Fakat Sunucu Sahibi Kapatabilir. ')
    db.set(`emojikoruma_${message.guild.id}`, true)
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Emoji Koruma Sistemi Aktifleştirildi.Herhangi Bir Durumda Sunucu Sahibine Bilgi Aktaracağım.').setColor("GREEN"));   // Code Universe
  };
  if (args[0] == 'kapat') { 
       if (db.fetch(`emojikoruma_${message.guild.id}`) === false) return message.channel.send('Emoji Koruma İşlemi Daha Önceden Kapalıymış,Fakat Sunucu Sahibi Açabilir.')
    db.set(`emojikoruma_${message.guild.id}`, false) 
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Emoji Koruma Sistemi Pasif Hale Getirildi!').setColor("RED"));
  // Code Universe
  };

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emoji-koruma"],
  permLevel: 0,
};
  // Code Universe
exports.help = {
  name: 'emojikoruma'
};