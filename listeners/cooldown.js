const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
class cooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }
    async exec(message, command, reason) {
        console.log(`[COOLDOWN]: ${message.author.tag} tried to use the $${command.id} command, but was on cooldown. @ ` + new Date())
        const config = require('../config.json')
        let colors = config.colors
        let color = colors[Math.floor(Math.random() * colors.length)];	 
        const fs = require('fs')
        let srcdata = fs.readFileSync('src.json');
        let src = JSON.parse(srcdata);
        message.channel.send(embed(`Please wait **${Math.ceil(parseInt(reason)/1000)} seconds** before running this command again.`));
        function embed(text) {
            let embed = new Discord.MessageEmbed();
            embed.setColor(color);
            embed.setDescription('**' + message.author.username + '#' + message.author.discriminator + `**, `+ text);
            embed.setTimestamp()
            embed.setFooter(src.footertext, src.footerimage)
            return embed;
          };
    }
}
module.exports = cooldownListener;