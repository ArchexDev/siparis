const { MessageEmbed, Collection, Client } = require("discord.js");
const data = require("quick.db");
const database = require("quick.db");
const ar = require("./sipariş.js");
const fs = require("fs");
const client = new Client();
client.data = data;
client.logger = console;
client.db = database;
client.commands = new Collection();
client.aliases = new Collection();
require('events').EventEmitter.defaultMaxListeners = Infinity;

client.on('ready', () => {
  client.logger.log("[SİPARİŞ]: "+client.user.tag+" ismiyle bağlandım!");
  client.user.setPresence({
    activity: {
      name: "!yardım - "+client.guilds.cache.array().length+" sunucu!",
      type: "WATCHING"
    },
    status: "idle"
  });
});
fs.readdir('./commands', (err, files) => {
    if (err) console.error(err);
    client.logger.log(`[SİPARİŞ]: ${files.length} komut yüklenecek.`)//  
    files.forEach(f => {
        let cmd = require(`./commands/${f}`);
        client.logger.log(`[GHOST PRO]: ${cmd.help.name} komutu yüklendi.`)
        client.commands.set(cmd.help.name, cmd);
        cmd.help.aliases.forEach(alias => {
            client.aliases.set(alias, cmd.help.name)
        });
    });
});

client.on('message', message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.guild) return message.channel.send(
      new MessageEmbed()
        .setColor("66ff00")
         .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
         .setDescription(`:face_with_monocle: 404 | Özel mesajlarda komut kullanmak veya mesaj yazmak yasak!`)
         .setFooter(`Sipariş Botu`, client.user.displayAvatarURL({dynamic:true}))
         .setTimestamp()
    );
  let prefix = ar.prefix;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
  }
});

client.login(ar.token)