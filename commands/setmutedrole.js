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
            description: {
                description: 'set the muted role for the current guild.',
                usage: 'setmutedrole <role>',
                example: 'setmutedrole @Muted'
                },
            args: [
            ],
            channel: 'guild',
            ownerOnly: true
            });
    }
    async exec(message, args) {
        const mutedRole = message.mentions.roles.first()
        if(mutedRole === undefined) {
            return properCommandUsage('``$setmutedrole <role>``', '``$setmutedrole @Muted``', message)
        }
            mutedRoleUpdate(mutedRole, message)
            respond(src.success +  ` **${message.guild.name}**'s muted role as **` + mutedRole.name + '**.', message)
            return;
    }
}
module.exports = SETMUTEDROLE;