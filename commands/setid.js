const { Command } = require('discord-akairo');
const { respond, error, properCommandUsage } = require('../respond');
const { dbUserUpdate } = require('../db')
const src = require('../src.json')
class SETID extends Command {
    constructor() {
        super('setid', {
            aliases: ['setid'],
            description: {
                description: 'set your in-game ID.',
                usage: 'setid <id>',
                example: 'setid 123-123-123'
                },
            args: [
                {
                    id: 'phrase',
                    match: 'phrase',
                    otherwise: (message) => properCommandUsage('``$setid <id>``', '``$setid 123-123-123``', message)
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        if(args.phrase.length !== 11) {
            return properCommandUsage('``$setid <id>``', '``$setid 123-123-123``', message)
        }
            dbUserUpdate(args.phrase, message)
            respond(src.success + ' set your ID as **' + args.phrase + '**.', message)
            return;
    }
}
module.exports = SETID;