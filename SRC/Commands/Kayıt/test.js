const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require("discord.js");
const client = global.client;
const conf = require('../../../Settings/conf.js')

module.exports = {
    conf: {
        aliases: ["test"], //! Komut kısayolları   [.k] yazarak komutu test edebilirsiniz.
        name: "test1",
        help: "test",
        category: "kayit",

    },

    run: async (client, message, args, prefix) => {

        //* komutlar buraya */

        var embed = new EmbedBuilder()
        .setColor(conf.EmbedColor)
        .setDescription(`
[GitHub Profil](https://github.com/smurfsx0)
        `)

        message.channel.send({embeds: [embed]})

    

    },
};