const { Command } = require('discord-akairo');
const { error, noTagRespond, respond } = require('../respond');
const src = require('../src.json')
const mongo = require('../mongo.js');
const newsSchema = require('../schemas/news-schema.js');
class NEWSINFO extends Command {
    constructor() {
        super('newsinfo', {
            aliases: ['newsinfo'],
            description: {
                description: 'view information about a specific Konami news article.',
                usage: 'newsinfo <article number>',
                example: 'newsinfo 1'
                },
            args: [
                {
                    id: 'content',
                    type: 'content'
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        const cache = {} 
        let data = cache[args.content] //switch
                    await mongo().then(async (mongoose) => {
                    try {
                        const result = await newsSchema.findOne({ _id: args.content });
                        if(result === null) {
                             error(src.notvalidarticle, message)
                             return;
                        }
                        cache[args.content] = data = [result.title]
                        const title = data[0]
                        cache[args.content] = data = [result.description]
                        const description = data[0]
                        cache[args.content] = data = [result.date]
                        const date = data[0]
                        cache[args.content] = data = [result.type]
                        const type = data[0]
                        console.log(`[FETCH]: Fetched NEWS DATA from MONGODB.`)
                        return noTagRespond('**' + title  + '**\n\n*' + description + '*\n\n**Publication Date:** ' + date + '\n**Announcement Type: **' + type, message)
                    } finally {
                        mongoose.connection.close()
                    }
                })
        return;
        }
}
module.exports = NEWSINFO;