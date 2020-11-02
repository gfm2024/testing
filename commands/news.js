const { Command } = require('discord-akairo');
const { error, noTagRespond, respond } = require('../respond');
const src = require('../src.json')
const Discord = require('discord.js')
const mongo = require('../mongo.js');
const newsSchema = require('../schemas/news-schema.js');
const config = require('../config.json')
let colors = config.colors
class NEWS extends Command {
    constructor() {
        super('news', {
            aliases: ['news'],
            description: {
                description: 'view all current Konami news articles.',
                usage: 'news',
                example: 'news'
                },
            args: [
            ],
        });
    }
    async exec(message, args) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        const cache = {} 
        let data = cache[message]
                await mongo().then(async (mongoose) => {
                    try {
                        const count = '3'
                        var i; 
                        const embedd = new Discord.MessageEmbed()
                        embedd.setDescription('**' + src.articlesmessagetitle + '**')
                        embedd.setFooter(src.footertext, src.footerimage)
                        embedd.setColor(color)
                        for (i = 0; i < count; i++) {
                            const t = i + 1
                            const result = await newsSchema.findOne({ _id: t })
                            cache[message] = data = [result.title]
                            const title = data[0]
                            embedd.addField('**Article ' + t + '**:', '*' + title + '*')
                          }
                        message.channel.send(embedd)
                    } finally {
                        mongoose.connection.close()
                    }
                })
        return;
        }
}
module.exports = NEWS;