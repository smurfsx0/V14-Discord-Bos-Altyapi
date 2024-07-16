const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require("discord.js");
const client = global.client;
const conf = require('../../../Settings/conf.js')

module.exports = {
    conf: {
        aliases: ["ping","ms"], //! Komut kısayolları   [.k] yazarak komutu ping edebilirsiniz.
        name: "ping",
        help: "ping",
        category: "kayit",

    },

    run: async (client, message, args, prefix) => {

        //* komutlar buraya */

        var embed = new EmbedBuilder()
            .setColor(conf.EmbedColor)
            .setDescription(`
            __Bot Pingi:__ ${client.ws.ping}ms
        `)

        message.channel.send({ embeds: [embed] })



    },
};