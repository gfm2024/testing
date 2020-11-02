const { Command } = require('discord-akairo');
const { respond, error, properCommandUsage } = require('../respond');
const { mutedRoleUpdate } = require('../db')
const src = require('../src.json')
const mongo = require('../mongo.js');
const guildSchema = require('../schemas/guild-schema.js');
class SETMUTEDROLE extends Command {
    constructor() {
        super('setmutedrole', {
            aliases: ['setmutedrole'],
            clientPermissions: ['MANAGE_GUILD'],
            userPermissions: ['MANAGE_GUILD'],
            description: {
                description: 'set the muted role for the current guild.',
                usage: 'setmutedrole <role>',
                example: 'setmutedrole @Muted'
                },
            args: [{
                id: 'role',
                type: 'role',
                otherwise: (message) => properCommandUsage('``$setmutedrole <role>``', '``$setmutedrole @Muted``', message)
            }],
            channel: 'guild',
            });
    }
    async exec(message, args) {
            mutedRoleUpdate(args.role.id, message)
            respond(src.success +  ` **${message.guild.name}**'s muted role as **` + args.role.name + '**.', message)
            return;
    }
}
module.exports = SETMUTEDROLE;