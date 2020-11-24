const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {

   message.channel.send('Laf yükleniyor...').then(message => {
      var espriler = ['Senin gittiğin yoldan biz geri dönüyorduk aslanım.','Sana bi laf sokmak lazım yan etkisi yokmuş.','Sеnin zirvеn bеnim zеminim!','Güzel gözler yetmiyor birazda akıl lazım.','Seni şifrem yapayım dedim, yetersiz karakter dedi.','Karakterin yere düşmüş,al onu yerden!'];
      var espri = espriler[Math.floor(Math.random() * espriler.length)];
            message.edit(`${espri}`);
 });
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['laf', 'laf-sok', 'sok-laf', 'lafsokknk'],
  permLevel: 0,
  kategori:'eğlence'
};

exports.help = {
  name: 'lafsok',
  description: 'laf sokar.',
  usage: 'lafsok'
};