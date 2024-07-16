const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const conf = require("../../Settings/conf.js")

module.exports = async (client) => {

    //Functionlarınızı buraya tanımlayabilirsiniz.

    unixtimeşuan = (smurfsx) => {
        let time;
        if (smurfsx === undefined) time = `<t:${Math.floor(Date.now() / 1000)}>` // November 28, 2018 9:01 AM
        if (smurfsx === "normal") time = `<t:${Math.floor(Date.now() / 1000)}>` // November 28, 2018 9:01 AM
        if (smurfsx === "önce") time = `<t:${Math.floor(Date.now() / 1000)}:R>` // 13 Saniye Önce
        if (smurfsx === "saat") time = `<t:${Math.floor(Date.now() / 1000)}:t>` // 9:01 
        if (smurfsx === "uzun") time = `<t:${Math.floor(Date.now() / 1000)}:F>` // Wednesday, November 28, 2018 9:01 AM
        return time;
    }

    unixtime = (smurfsx) => {
        let time;
        if (smurfsx === undefined) time = `[Doğru Zaman Belirtilmedi]`
        if (smurfsx === "normal") time = `<t:${Math.floor(smurfsx / 1000)}>`
        if (smurfsx === "önce") time = `<t:${Math.floor(smurfsx / 1000)}:R>`
        if (smurfsx === "saat") time = `<t:${Math.floor(smurfsx / 1000)}:t>`
        if (smurfsx === "uzun") time = `<t:${Math.floor(smurfsx / 1000)}:F>`
        return time;
    }

    client.sayıEmoji = (sayi) => {
        var can = sayi.toString().replace(/ /g, "     ");
        var can2 = can.match(/([0-9])/g);
        can = can.replace(/([a-zA-Z])/g, "Belirlenemiyor").toLowerCase();
        if (can2) {
            can = can.replace(/([0-9])/g, d => {
                return {
                    '0': client.emoji("_0") !== null ? client.emoji("_0") : "0",
                    '1': client.emoji("_1") !== null ? client.emoji("_1") : "1",
                    '2': client.emoji("_2") !== null ? client.emoji("_2") : "2",
                    '3': client.emoji("_3") !== null ? client.emoji("_3") : "3",
                    '4': client.emoji("_4") !== null ? client.emoji("_4") : "4",
                    '5': client.emoji("_5") !== null ? client.emoji("_5") : "5",
                    '6': client.emoji("_6") !== null ? client.emoji("_6") : "6",
                    '7': client.emoji("_7") !== null ? client.emoji("_7") : "7",
                    '8': client.emoji("_8") !== null ? client.emoji("_8") : "8",
                    '9': client.emoji("_9") !== null ? client.emoji("_9") : "9"
                }[d];
            });
        }
        return can;
    }


    client.emoji = function (emojiisim) {
        let emoji = client.guilds.cache.get(conf.GUILD_ID).emojis.cache.find(can => can.name == emojiisim)
        if (!emoji) return null;
        return emoji;
    } // ${client.emoji("Emoji_İsim")} olarak komutlar arasında  kullanabilirsiniz 
    // Sunucuda bulunan emojinin ismini bulur koda ekler

    client.kanalbul = function (kanalisim) {
        let kanal = client.guilds.cache.get(conf.GUILD_ID).channels.cache.find(can => can.name === kanalisim)
        if (!kanal) return false;
        return kanal;
    } // ${client.kanalbul("Kanal_İsim")} olarak komutlar arasında  kullanabilirsiniz

    client.rolbul = function (rolisim) {
        let rol = client.guilds.cache.get(conf.GUILD_ID).roles.cache.find(can => can.name === rolisim)
        if (!rol) return false;
        return rol;
    }

    // Belirli bir süre sonra mesaj sildirme fonksiyonu .sil(10) 10 saniye sonra komutu sil
    Promise.prototype.sil = function (time) {
        if (this) this.then(s => {
            if (s.deletable) {
                setTimeout(async () => {
                    s.delete().catch(e => { });
                }, time * 1000)
            }
        });
    };
};
