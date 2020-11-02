const { Command } = require('discord-akairo');
const { error, displayHelpMessage, noTagRespond, respond } = require('../respond');
class HELP extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                description: 'view information about a specific command.',
                usage: 'help <commmand>',
                example: 'help setid'
                },
            args: [{
                id: 'alias',
                type: 'command',
                otherwise: (message) => error(`you need to specify a command to view help on.`, message)
              }],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        displayHelpMessage(args.alias, this.client.commandHandler.prefix, message)
        }
}
module.exports = HELP;