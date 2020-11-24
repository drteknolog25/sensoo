const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, params) => {
  
  let prefix = ayarlar.prefix
 
  if (!params[0]) {
    message.channel.sendCode("asciidoc",`= SENSO Yetkili Yardım Menüsü =

${prefix}self-bot-koruma                 
${prefix}mod-log                 
${prefix}küfür-engelle                 
${prefix}kanal-koruma              
${prefix}capslockengel            
${prefix}rolkoruma           
${prefix}emojikoruma       
${prefix}reklam-taraması `);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} =

Hakkında  :: ${command.help.description}
Kullanım  :: ${prefix}${command.help.usage}`);
    }
  }
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'guard',
  description: 'Komut kategorilerini gösterir.',
  usage: 'guard'
};
