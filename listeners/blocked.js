const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }
    exec(message, command, reason) {
        const config = require('../config.json')
        let colors = config.colors
        let color = colors[Math.floor(Math.random() * colors.length)];	 
        const fs = require('fs')
        let srcdata = fs.readFileSync('src.json');
        let src = JSON.parse(srcdata);
        message.channel.send(embed(`you can't use the **$${command.id}** command because you're not an **${reason}**.`))
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

module.exports = CommandBlockedListener;