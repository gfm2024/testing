const { Command, CommandHandler } = require('discord-akairo');
const { respond, error } = require('../respond');
const src = require('../src.json')
const mongo = require('../mongo.js');
const eventSchema = require('../schemas/event-schema.js');
class NEWEVENT extends Command {
    constructor() {
        super('addevent', {
            aliases: ['addevent'],
            description: {
                description: 'add an event as a bot owner.',
                usage: 'addevent <options>',
                example: 'addevent <opt>'
                },
            ownerOnly: true,
            args: [
                {
                    id: 'eventteamtype',
                    match: 'phrase',
                    otherwise: () => 'no draw cost defined!'
                },
                {
                    id: 'eventtype',
                    match: 'phrase',
                    otherwise: () => 'no title defined!'
                },
                {
                    id: 'eventperiod',
                    match: 'phrase',
                    otherwise: () => 'no best players defined!'
                },
                {
                    id: 'eventrewards',
                    match: 'phrase',
                    otherwise: () => 'no release date defined!'
                },
                {
                    id: 'number',
                    match: 'phrase',
                    otherwise: () => 'no number defined!'
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        //smessage.channel.send(CommandHandler.modules)

            await mongo().then(async (mongoose) => {
                try {
                    await eventSchema.findOneAndUpdate({
                        _id: args.number
                    }, {
                        _id: args.number,
                        teamtype: args.eventteamtype,
                        eventtype: args.eventtype,
                        period: args.eventperiod,
                        rewards: args.eventrewards,
                    }, {
                        upsert: true
                    }
                    )
                    await console.log(`[MONGODB]: Parsed "` + args.eventtype + `" as a new Event.`)
                } finally {
                    mongoose.connection.close
                }
            })
            respond(src.success + ' set a new event named **' + args.eventtype + '**.', message)
            return;
            }
}
module.exports = NEWEVENT;