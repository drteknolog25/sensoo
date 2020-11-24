const discord = require('discord.js')
exports.run = async(client, message, args) => {
//ESADATMACAYT
if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`Bu komutu kullanabilmek için yeterli iznin yok. :x:`);
let ESADATMACA = message.mentions.members.first()
if (!ESADATMACA) return message.channel.send(`Kullanıcı Etiketle. :x:`)
let SAMET = args.slice(1).join(' ')
if (!ESADATMACA) return message.channel.send(`ismi gir.`)
//ESADATMACAYT
ESADATMACA.setNickname(SAMET)
message.channel.send(`${ESADATMACA} isimli kullanıcının adı \**${SAMET}\** olarak değiştirildi.`)
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
//ESADATMACAYT//
exports.help = {
  name: 'isim-değiştir',
  usage: 'isim-değiştir',
  description: 'isim-değiştir'
}