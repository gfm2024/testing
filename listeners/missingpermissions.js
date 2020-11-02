const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }
    exec(message, command, reason) {
        const config = require('../config.json')
        let colors = config.colors
        let color = colors[Math.floor(Math.random() * colors.length)];	 
        const fs = require('fs')
        let srcdata = fs.readFileSync('src.json');
        let src = JSON.parse(srcdata);
        message.channel.send(embed(`you can't use **$${command.id}** because you lack sufficient permissions.`))
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

module.exports = MissingPermissionsListener;