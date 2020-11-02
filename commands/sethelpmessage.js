const { Command, CommandHandler } = require('discord-akairo');
const { respond } = require('../respond');
const src = require('../src.json')
const mongo = require('../mongo.js');
const guildSchema = require('../schemas/guild-schema.js');
class SETHELP extends Command {
    constructor() {
        super('sethelpmessage', {
            aliases: ['sethelpmessage'],
            description: {
                description: 'set the help message for the current guild. <DEPRECATED>',
                usage: 'sethelpmessage',
                example: 'sethelpmessage'
                },
            args: [
                {
                    id: 'content',
                    match: 'content'
                }
            ],
            channel: 'guild',
            ownerOnly: true
        });
    }
    async exec(message, args) {
        if(!args.content) {
            return respond(src.noquery, message)
        }
            await mongo().then(async (mongoose) => {
                try {
                    await guildSchema.findOneAndUpdate({
                        _id: message.guild.id
                    }, {
                        _id: message.guild.id,
                        helpmessage: args.content
                    }, {
                        upsert: true
                    }
                    )
                    await console.log(`[MONGODB]: Parsed "` + args.content + `" into ${message.guild.name}'s HELP MESSAGE.`)
                } finally {
                    mongoose.connection.close
                }
            })
            respond(src.success +  ` **${message.guild.name}**'s help message as **` + args.content + '**.', message)
            return;
    }
}
module.exports = SETHELP;