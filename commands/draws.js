const { Command } = require('discord-akairo');
  const Discord = require('discord.js')
  const { error, noTagRespond, respond } = require('../respond');
  const mongo = require('../mongo.js');
  const src = require('../src.json')
  const drawSchema = require('../schemas/draw-schema.js');
  const config = require('../config.json')
  let colors = config.colors
  class DRAWS extends Command {
    constructor() {
      super('draws', {
        aliases: ['draws'],
        description: {
          description: 'view all current in-game draws.',
          usage: 'draws',
          example: 'draws'
          },
        args: [],
      });
    }
    async exec(message, args) {
      let color = colors[Math.floor(Math.random() * colors.length)];
      await mongo().then(async (mongoose) => {
        try {
          const count = '3'
          var i;
          const embedd = new Discord.MessageEmbed()
          embedd.setDescription('**' + src.drawsmessagetitle + '**')
          embedd.setFooter(src.footertext, src.footerimage)
          embedd.setColor(color)
          for (i = 0; i < count; i++) {
            const t = i + 1
            const result = await drawSchema.findOne({
              _id: t
            })
            const information = result.information
            const title = information[0]
            embedd.addField('**Draw ' + t + '**:', '*' + title + '*')
          }
          message.channel.send(embedd)
        } finally {
          mongoose.connection.close()
        }
      })
    }
  }
  module.exports = DRAWS;