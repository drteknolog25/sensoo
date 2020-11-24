const Discord = require('discord.js');
const db = require("quick.db")
exports.run = async (client, message, args) => {
  let sebep = args[1]
 let etiket = message.mentions.users.first()
  const uyarıbak = await db.fetch(`uyarı_${message.channel.id}_${etiket}`);
if(!etiket){
  message.channel.send("Uyarmam İçin Birisini Etiketlemelisin")
}
  if(etiket){
  if(!sebep){
  message.channel.send("Uyarmam İçin Bir Sebep Belirtmelisin")
}
 if(sebep){
  if(uyarıbak == 3){// 3 tane uyarı olursa yana kanala bildiri  mesajı göndercek yada banlıyacak başındaki // leri silerek çalıştırabilirsiniz
  ///ban///
  message.guild.ban(etiket)
   etiket.send(new Discord.RichEmbed().setDescription(`**${message.guild.name}** Sunucusundan yasaklandın! \n \n **Yasaklanma sebebin:** 3 Tane Uyarı Limitini Aştı`))
 ////Bildiri Mesajı///
  //message.channel.send(`${etiket} Adlı Kullanıcının Uyarı Sayısı 3'e Ulaştı  Bir Ceza Hak Etmiyor Mu?`)   
  }
  db.add(`uyarı_${message.channel.id}_${etiket}`,  1) 
     await message.channel.send(`${etiket} adlı kullanıcı uyarıldı`)
 await etiket.send(message.author.username + " Adlı Kişi Seni **" + sebep + "** Sebebiyle Uyardı. Kurallara Uymaya Özen Göster! Uyarı Sayın: " + uyarıbak )
return
  }
  }
   }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['uyar'],
  permLevel: 9// Bende 9 sunucu yöneticisi sizde neyse onu yapıyorsunuz
};
exports.help = {
  name: 'uyar', 
  description: 'Etiketlediğin Kişiyi Uyarır',
  usage: 'uyar @user sebep'
}; 