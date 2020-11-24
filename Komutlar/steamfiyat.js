const Discord = require('discord.js')
var steam = require('steam-provider')
var provider = new steam.SteamProvider();

exports.run = (client, message, args) => {
    let game = args[0]
    let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png"
    if (!game) return message.reply('Lütfen Steamde Olan Bir Oyunun Adını Yazın. Örnek: `!steamfiyat PUBG`')
    provider.search(game).then(result => {
    provider.detail(result[0].id, "turkey", "tr").then(results => {
        console.log(results)
    const embed = new Discord.RichEmbed()
    .setAuthor('Steam Store', steampng)//SüleymanWinner
  .setColor("#36393F")//SüleymanWinner
    .setTitle(result[0].name)//SüleymanWinner
    .addField(`Oyunun ID'sı`, result[0].id)//SüleymanWinner
    .setThumbnail(results.otherData.imageUrl)//SüleymanWinner
    .addField('Türleri', results.genres)//SüleymanWinner
    .addField('Fiyati', `Nolmal Fiyat **${results.priceData.initialPrice}** TL
İndirimli Fiyat **${results.priceData.finalPrice}** TL`, true)//SüleymanWinner
    .addField('Platformlar', results.otherData.platforms, true)//SüleymanWinner
    .addField('Metacritic Puanı', results.otherData.metacriticScore, true)//SüleymanWinner
    .addField('Etiketleri', results.otherData.features, true)//SüleymanWinner
    .addField('Geliştiricileri', results.otherData.developer, true)//SüleymanWinner
    .addField('Yayımcıları', results.otherData.publisher)//SüleymanWinner
  .setColor("#36393F")//SüleymanWinner
    message.channel.send(embed).catch(e => {
        console.log(e)
        message.reply('Hata Olustu Yada `' + game + '` Adlı Oyun Bulunamadı')
    })
})
})
}
//SüleymanWinner

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
//SüleymanWinner
exports.help = {
  name: 'steamfiyat',
  description: 'Aradağınız oyunun steamdaki fiyatına bakmanızı sağlar',
  usage: '!steamfiyat PUBG'
};