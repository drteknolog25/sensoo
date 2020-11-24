const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, params) => {
  
  let prefix = ayarlar.prefix
 
  if (!params[0]) {
    message.channel.sendCode("asciidoc",`= SENSO Yetkili Yardım Menüsü =

${prefix}git                 
${prefix}çek                 
${prefix}ban                 
${prefix}unban              
${prefix}forceban            
${prefix}user-info           
${prefix}isim-değiştir       
${prefix}otorol              
${prefix}otorol-mesaj-ayarla 
${prefix}sa-as aç/kapat      
${prefix}sayaç-ayarla        
${prefix}sayaç-kanal-ayarla  
${prefix}sil                 `);
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
  name: 'yetkili',
  description: 'Komut kategorilerini gösterir.',
  usage: 'yetkili'
};
