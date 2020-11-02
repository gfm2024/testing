const { Command } = require('discord-akairo');
  const { dbArrayFind }= require('../db')
  class DRAWINFO extends Command {
    constructor() {
      super('drawinfo', {
        aliases: ['drawinfo'],
        description: {
          description: 'view information about a specific player draw.',
          usage: 'drawinfo <number>',
          example: 'drawinfo 1'
          },
        args: [{
          id: 'content',
          type: 'content'
        }],
        channel: 'guild'
      });
    }
    async exec(message, args) {
      return dbArrayFind(args.content, 'draw', '5', message);
    }
  }
  module.exports = DRAWINFO;