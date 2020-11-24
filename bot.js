const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const Canvas = require("canvas"),
  Image = Canvas.Image,
  Font = Canvas.Font,
  path = require("path");
const snekfetch = require("snekfetch");
const fs = require("fs");
const DBL = require("dblapi.js");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const ytdl = require("ytdl-core");
const generator = require("generate-password");
const math = require("math-expression-evaluator");
const db = require("quick.db");
const moment = require("moment");
const ms = require("parse-ms");
const GIFEncoder = require("gifencoder");
require("moment-duration-format");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Adet komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: [Artemus] > ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

// afk

client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;

  var afklar = await db.fetch(`afk_${message.author.id}, ${message.guild.id}`);

  if (afklar) {
    db.delete(`afk_${message.author.id}, ${message.guild.id}`);
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`);

    message
      .reply(`Artık afk değilsin. Tekrardan hoş geldin.`)
      .then(msg => msg.delete(9000));
    try {
      let takma_ad = message.member.nickname.replace("[AFK]", "");
      message.member.setNickname(takma_ad).catch(err => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  }
  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  let zaman = await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`);

  var süre = ms(Date.now() - zaman);

  var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`);
  if (
    await db.fetch(
      `afk_${message.mentions.users.first().id}, ${message.guild.id}`
    )
  ) {
    if (süre.days !== 0) {
      message.channel.send(
        `**${kullanıcı}** Kullanıcısı **${süre.days}** Gün **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`
      );
      return;
    }

    if (süre.hours !== 0) {
      message.channel.send(
        `**${kullanıcı}** Kullanıcısı **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`
      );
      return;
    }
    if (süre.minutes !== 0) {
      message.channel.send(
        `**${kullanıcı}** Kullanıcısı **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`
      );
      return;
    }
    if (süre.seconds !== 0) {
      message.channel.send(
        `**${kullanıcı}** Kullanıcısı **Bir Kaç Saniye** Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`
      );
      return;
    }
  }
});
//OTOROL//

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let rol2 = member.guild.roles.find("name", rol);

  const rolk = await db.fetch(`rolK_${member.guild.id}`);
  if (!rolk) return;
  const rolk2 = member.guild.channels.find("name", rolk);
  const otorolmesaj = await db.fetch(`otorolm_${member.guild.id}`);

  member.addRole(rol2);
  rolk2.send(
    otorolmesaj
      ? otorolmesaj
          .replace("{kullanıcı}", `${member.user}`)
          .replace("{rol}", `${rol2.name}`)
      : `●  \`${member.user.tag}\` adlı kullanıcıya \`${rol2.name}\` rolü verildi.`
  );
});

//

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(
          `Başarıyla \`${db.fetch(
            `sayac_${message.guild.id}`
          )}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`
        )
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var tarih = moment(member.user.createdAt).fromNow();
  var totaluser = member.guild.memberCount;
  const embed = new Discord.RichEmbed()
    .setColor("#7B1FA2")
    .setDescription(
      `**${member.user.tag}** Ayrıldı,  \`${db.fetch(
        `sayac_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
        member.guild
          .memberCount}\` üye kaldı! **${totaluser}** Kişiyiz! \n \n Hesap oluşturma tarihi ${tarih} <:hesapolusturma:747327562161717419>`
    )
    .setThumbnail(member.user.avatarURL);
  member.guild.channels.get(channel).send(embed);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var tarih = moment(member.user.createdAt).fromNow();
  var totaluser = member.guild.memberCount;
  const embed = new Discord.RichEmbed()
    .setColor("#7B1FA2")
    .setDescription(
      `**${member.user.tag}** Katıldı,  \`${db.fetch(
        `sayac_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
        member.guild
          .memberCount}\` üye kaldı! **${totaluser}** Kişiyiz! \n \n Hesap oluşturma tarihi ${tarih} <:hesapolusturma:747327562161717419>`
    )

    .setThumbnail(member.user.avatarURL);
  member.guild.channels.get(channel).send(embed);
});

//SA-AS//

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply("Aleyküm Selam Hoşgeldin ^^");
    }
  }
});

//Caps//
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `Bu sunucuda Caps Lock Engelleme sistemi kullanılıyor.Bu yüzden mesajını sildim!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});
//SELFBOTKORUMA//
client.on("message", message => {
  var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`);
  if (!antiraid) return;
  if (message.author.bot) return;
  message.guild.fetchMember(message.author).then(member => {
    if (member.hasPermission("BAN_MEMBERS")) return;
    var b = [];
    var aut = [];
    setTimeout(() => {
      message.channel.fetchMessages({ limit: 10 }).then(m => {
        m.forEach(a => {
          if (m.filter(v => v.content === a.content).size > m.size / 2) {
            message.guild.fetchMember(m.author).then(member2 => {
              if (member2.hasPermission("BAN_MEMBERS")) return;
              b.push(a);
              aut.push(a.author);
            });
          }
        });
        if (!b.includes(":warning: | `Self` Botlar Susturulacak.")) {
          işlem();
        } else {
        }

        function işlem() {
          if (b.length > 5) {
            message.channel.send(":warning: | `Self` Botlar Susturulacak.");
            aut.forEach(a => {
              message.channel.overwritePermissions(a, {
                SEND_MESSAGES: false
              });
            });
            message.channel.send(" | `Self` botlar susturuldu.");
          } else return;
        }
      });
    });
  });
});
//ROLKORUMA//
client.on("roleDelete", async (role, channel, message, guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
  if (rolkoruma == "acik") {
    role.guild.createRole({
      name: role.name,
      color: role.color,
      permissions: role.permissions
    });
    role.guild.owner.send(
      ` **${role.name}** Adlı rol silindi. Koruma amaçlı tekrardan eklendi.`
    );
  }
});
//kanalkoruma//
client.on("channelCreate", async (channel, member, guild) => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (kanal == "acik") {
    channel.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir kanal oluşturuludu! fakat geri silindi! ( Kanal Koruma Sistemi) "
      )
      .setColor("BLACK");
    channel.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});
//emojikoruma//
// Emoji Koruma
client.on("emojiDelete", async function(emoji, kisi) {
  const i = await db.fetch(`emojikoruma_${emoji.guild.id}`, true);
  if (i) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJİ_DELETE" })
      .then(audit => audit.entries.first());

    let kisi = emoji.guild.member(entry.executor);
    kisi.roles
      .filter(a => a.hasPermission("ADMINISTRATOR"))
      .forEach(x => kisi.removeRole(x.id));
    kisi.roles
      .filter(a => a.hasPermission("MANAGE_EMOJIS"))
      .forEach(x => kisi.removeRole(x.id));
    kisi.roles
      .filter(a => a.hasPermission("MANAGE_ROLES"))
      .forEach(x => kisi.removeRole(x.id));
    kisi.kick(kisi);
    const deleter = emoji.executor;
    const id = emoji.executor.id;

    if (id === client.user.id || id === emoji.guild.ownerID) return;

    emoji.guild.members.forEach(async function(members) {
      if (members.id !== id) return;
      members.roles.forEach(role => {
        if (role.hasPermission(8) || role.hasPermission("MANAGE_EMOJIS")) {
          members.removeRole(role.id);
        }
      });
    });
  }
});
//boteklenincesahipmesaj//
client.on("guildCreate", guild => {
  let esad = guild.owner;

  const esadatmaca = new Discord.RichEmbed()
    .setTitle(`Teşekkürler!`)
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .setColor("BLACK")
    .addField("Prefixim", ayarlar.prefix)
    .addField(`Destek Sunucusu`, `https://discord.gg/8jPQMHY`);
});
//etiketprefix//
client.on("message", message => {
  if (message.content === `<@759017300178501633>`) {
    message.channel.send("Buyrun Hizmetinizdeyim **Prefixim : w!**");
  }
});
//