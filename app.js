const { Client, Collection } = require("discord.js");
const fs = require("fs");
const chalk = require('chalk')
const path = require('path');
const mongoose = require('mongoose')
const client = (global.client = new Client({
    intents: ["GuildMembers", "MessageContent", "Guilds", "GuildMessages", "GuildMessageReactions", "GuildEmojisAndStickers", "GuildVoiceStates", "GuildPresences",],
}));

client.commands = new Collection();
client.aliases = new Collection();
const conf = require('./Settings/conf.js') // Config Doyası Yolu

fs.readdir(path.resolve(__dirname, "SRC", "Commands"), (err, files) => {
    if (err) console.error(err);
    files.forEach((f) => {
        fs.readdir(
            path.resolve(__dirname, "SRC", "Commands", f),
            (err2, files2) => {
                files2.forEach((file) => {
                    let props = require(path.resolve(
                        __dirname,
                        "SRC",
                        "Commands",
                        f,
                        file,
                    ));
                    console.log(
                        `[Smurfsx] [✔] Yüklenen Komut: ${props.conf.name} `,
                    );
                    client.commands.set(props.conf.name, props);
                    props.conf.aliases.forEach((alias) => {
                        client.aliases.set(alias, props.conf.name);
                    });
                });
            },
        );
    });
});
fs.readdir(path.resolve(__dirname, "SRC", "events"), (err, files) => {
    if (err) return console.error(err);
    files
        .filter((file) => file.endsWith(".js"))
        .forEach((file) => {
            let prop = require(path.resolve(__dirname, "SRC", "Events", file));
            if (!prop || !prop.conf) return;
            client.on(prop.conf.name, prop);
            console.log(chalk.green(`[Event] [✔] Yüklenen Event: ${prop.conf.name}`));
            //console.log(`[Event] [✔] Yüklenen Event: ${prop.conf.name}`);
        });
});

function logBox(message, color) {
    const line = '═'.repeat(message.length + 4);
    console.log(chalk[color](`${line}\n║ ${message} ║\n${line}`));
}

mongoose.connect(conf.mongoURL)
    .then(() => {
        logBox(`[DataBase] Bağlantısı Aktif Edildi [✔]`, `cyan`)
        //console.log(chalk.green(`[DataBase] [✔] Bağlantı Başarılı!`));
    })
    .catch((err) => {
        logBox(`[Hata] MongoDB URL Linki Gir: ./settings/conf.js`, `red`, err)
        //console.log(chalk.red(`[DataBase] [✖] MongoDB URL Linki Gir:`, err));
    });



client.login(conf.token)
    .then(() => {
        logBox(`[${client.user.tag}] Adlı Bot Başarıyla Giriş Yaptı [✔]`, `cyan`)
    })
    .catch((err) => {
        logBox(`[Hata] Bota Token Gir Kanka: ./settings/conf.js`, `red`, err)
    })