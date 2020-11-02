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
                example: 'setid 123123123'
                },
            args: [
                {
                    id: 'integer',
                    type: 'integer',
                    otherwise: (message) => properCommandUsage('``$setid <id>``', '``$setid 123123123``', message)
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        const test = JSON.stringify(args.integer)
        if(test.length !== 9) {
            return properCommandUsage('``$setid <id>``', '``$setid 123123123``', message)
        }
            dbUserUpdate(args.integer, message)
            respond(src.success + ' set your ID as **' + args.integer + '**.', message)
            return;
    }
}
module.exports = SETID;