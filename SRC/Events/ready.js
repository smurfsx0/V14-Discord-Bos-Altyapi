const { joinVoiceChannel } = require("@discordjs/voice");
const { ActivityType } = require("discord.js");
const conf = require("../../Settings/conf.js");
const chalk = require('chalk')

module.exports = async (client) => {
    require("../Modules/function.js")(client);
    let guild = client.guilds.cache.get(conf.GUILD_ID);
    await guild.members.fetch().then((e) => console.log(chalk.yellow('Üyeler fetchlendi!')))

    const VoiceChannel = client.channels.cache.get(conf.BOT_VOICE_CHANNEL);
    joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true
    });

    setInterval(() => {
        const Smurfx = Math.floor(Math.random() * conf.BOT_STATUS.length,);
        client.user.setPresence({
            activities: [
                {
                    name: conf.BOT_STATUS[Smurfx],
                    type: ActivityType.Streaming,
                    url: conf.URL
                },
            ],
            status: "dnd",
        });
    }, 10000);
};

module.exports.conf = {
    name: "ready",
};
