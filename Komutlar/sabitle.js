const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  try {
    message.channel.fetchMessages({limit: 2}).then(async messages => {
      if (!Array.from(messages.keys())[1]) return message.reply('Bir mesaj göndermelisin ');
      let msg = messages.get(Array.from(messages.keys())[1]);
      msg.pin();
let jaus00 = new Discord.RichEmbed()
 .setDescription('Mesaj sabitlendi.')
      message.channel.send(jaus00);
    });
  } catch (err) {
let jaus01 = new Discord.RichEmbed()
 .setDescription('Bir hata oluştu!\n' + err)
    message.channel.send(jaus01).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['mesaj-sabitle'],
  guildOnly: false,
  permLevel: 0,
};

exports.help = {
  name: 'sabitle'
};