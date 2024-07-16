const { PermissionsBitField, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const conf = require("../../Settings/conf");
const client = global.client;

module.exports = async (message) => {

    if (message.author.bot && message.author.id !== client.user.id) return;
    let prefix = conf.PREFIX;
    let jar = false;
    for (const x of prefix) {
        if (message.content.startsWith(x)) jar = x;
    }

    if (!jar) return;

    const args = message.content.slice(jar.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member)
        await message.guild.fetchMember(message.author);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    if (cmd && !message.guild && cmd.conf.guildOnly) return;
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
    }
    //console.log(`${message.author.username} (${message.author.id}) komut kullandı "${cmd.conf.name}" kullandığı kanal ${message.channel.name}`,"cmd",
    //);

    cmd.run(client, message, args);

};

module.exports.conf = {
    name: "messageCreate",
};
