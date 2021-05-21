const Discord = require('discord.js');
const db = require("quick.db");
const ar = require("../sipariş.js");

exports.run = async (client, message, args) => {
  
    let logkanal = "logid";

    let embed = new Discord.MessageEmbed()
    .setTitle("Ghost Code Sipariş Menüsü")
    .setDescription(ar.bot1_isim+", sipariş vermek için: :one:\n"+ar.bot2_isim+", sipariş vermek için: :two:")
    .addField(ar.bot1_isim, "> "+ar.bot1_aciklama, true)
    .addField(ar.bot2_isim, "> "+ar.bot2_aciklama, true)
    .setColor("BLUE")
    .setFooter("Sipariş Sistemi")

    let embed2 = new Discord.MessageEmbed()
    .setTitle("Ghost Code Sipariş Menüsü")
    .setColor("BLUE")
    .setFooter("Sipariş Sistemi")
    .setDescription("**"+ar.bot1_isim+"** adlı bot için siparişiniz alındı!")

    let embed3 = new Discord.MessageEmbed()
    .setTitle("Ghost Code Sipariş Menüsü")
    .setColor("BLUE")
    .setFooter("Sipariş Sistemi")
    .setDescription("**"+ar.bot2_isim+"** adlı bot için siparişiniz alındı!")

    let msg = await message.channel.send(embed);

    await msg.react("1️⃣")
    await msg.react("2️⃣")

    const backwards = msg.createReactionCollector((reaction, user) => user.id == message.author.id);

    backwards.on('collect', async (reaction, user) => {
      
      if(reaction._emoji.name == "1️⃣") {
        msg.reactions.removeAll().catch(error => { console.log("emojileri silemiorum.") })
        await msg.edit(embed2)
        client.guilds.cache.get(message.guild.id).channels.cache.get(logkanal).send("<@"+message.author.id+"> adlı kullanıcı **"+ar.bot1_isim+"** adlı botun siparişini verdi!");
      };

      if(reaction._emoji.name == "2️⃣") {
        msg.reactions.removeAll().catch(error => { console.log("emojileri silemiorum.") })
        await msg.edit(embed3);
        client.guilds.cache.get(message.guild.id).channels.cache.get(logkanal).send("<@"+message.author.id+"> adlı kullanıcı **"+ar.bot2_isim+"** adlı botun siparişini verdi!");
        
      };
    });
};

exports.help = {
    name: "sipariş",
    aliases: []
};
