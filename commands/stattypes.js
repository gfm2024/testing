const { Command } = require('discord-akairo');
  const { dbArrayFind }= require('../db')
  const { error } = require('../respond')
  class STATTYPES extends Command {
    constructor() {
      super('stattypes', {
        aliases: ['stattypes'],
        description: {
            description: 'view all current stat types for the ``$stats`` command.',
            usage: 'stattypes',
            example: 'stattypes'
            },
        args: [{
          id: 'alias',
          type: 'command',
          otherwise: (message) => error(`You didn't specify a command.`, message)
        }],
        channel: 'guild'
      });
    }
    async exec(message, args) {
      
      return console.log(args.alias.description)
      return dbArrayFind('1', 'stat', '5', message);
    }
  }
  module.exports = STATTYPES;