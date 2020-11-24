const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  const mesaj2 = await db.fetch(`otorolm_${message.guild.id}`);
  
  let mesaj = args.slice(0).join(' ')
  
  
      if (!mesaj) {
        return message.channel.send(`:x: Otorol mesajını yazmalısın.`)
    }
  
    db.set(`otorolm_${message.guild.id}`, mesaj)
    message.channel.send(`:white_check_mark: Otorol mesajı \`${mesaj}\` olarak ayarlandı.`)
}
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['otorol-mesaj'],
  kategori: ':gear: Ayarlar',
    permLevel: 3
}

exports.help = {
    name: 'otorol-mesaj-ayarla',
    description: 'Otorol mesajını ayarlar. (Kullanıcı isminin geleceği yere "{kullanıcı}", rol isminin geleceği yere "{rol}" yazınız.)',
    usage: 'otorol-mesaj-ayarla <yazı>'
}
//EsadAtmacaYT