const Discord = require("discord.js");

exports.run = function(client, message, args) {

let user = message.mentions.users.first();

if (message.mentions.users.size < 1)
return message

      .reply("**Kimi Pompalamak İstiyosun **")
      .catch(console.error);

const EmbedGladiatorCode = new Discord.MessageEmbed()

    .setColor("#ff0000")
    .setDescription(
      message.author.username + ` ${user}` + "** adlı kişiyi, Pompaladı! :call_me: **"
    )
    .setImage("https://cdn.glitch.com/35fbe2e8-3d99-4acb-87e3-684aa9860590%2Fpompalama.gif?v=1597770132138")
    .setFooter("Pompalamasyon", client.user.avatarURL());

message.channel.send(EmbedGladiatorCode);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pompa", "pompala"],
  permLevel: 0
};

exports.help = {
  name: "pompalamasyon",
  description: "Belirtilen kişiyi, Tokatlar!",
  usage: "pompalamasyon"
};