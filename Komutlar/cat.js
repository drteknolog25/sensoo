const Discord = require('discord.js');//BenYazdımÇalmaKeserim
var request = require('request');

exports.run = (client, message, args) => {

request(`http://aws.random.cat/meow`, function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
        var info = JSON.parse(body);
          let winnerembed = new Discord.RichEmbed()
          .setColor("#7289DA")
          .setTitle("MMİİİİYYYAAAVV 🐱 Bir DİGNİTY Kedisi Belirdi")
          .setImage(info.file);

  message.channel.send(winnerembed);
    }
});
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kedi'],
  permLevel: 0
};

exports.help = {
    name: 'cat',
  description: 'Random Kedi Fotografi Atar.',
  usage: 'cat'
}; //EsadAtmacaYT