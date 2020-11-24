const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, params) => {
  
  let prefix = ayarlar.prefix
 
  if (!params[0]) {
    message.channel.sendCode("asciidoc",`= SENSO Yetkili Yardım Menüsü =

${prefix}15-temmuz çal-bitir                 
${prefix}155                 
${prefix}aşkölçer                 
${prefix}balıktut              
${prefix}bayrak            
${prefix}boks-makinesi           
${prefix}burç       
${prefix}cat              
${prefix}köpek 
${prefix}doğruluk-cesaret      
${prefix}espri        
${prefix}herkesebendençay  
${prefix}kafasalla  
${prefix}lafsok                 
${prefix}matematik                 
${prefix}resimçiz                 
${prefix}romen                 
${prefix}saat                 
${prefix}soygunyap                 
${prefix}spotify                 
${prefix}tkm                 
${prefix}tokat                 
${prefix}twitter                 
${prefix}öp                 
${prefix}yılbaşı                 
${prefix}afk`);
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
  name: 'eğlence',
  description: 'Komut kategorilerini gösterir.',
  usage: 'eğlence'
};
