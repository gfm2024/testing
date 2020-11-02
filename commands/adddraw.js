const { Command } = require('discord-akairo');
const { respond, error } = require('../respond');
const fs = require('fs');
let srcdata = fs.readFileSync('src.json');
let src = JSON.parse(srcdata);
const mongo = require('../mongo.js');
const drawSchema = require('../schemas/draw-schema.js');
class NEWDRAW extends Command {
    constructor() {
        super('adddraw', {
            aliases: ['adddraw'],
            description: {
                description: 'add a draw as a bot owner.',
                usage: 'adddraw <option>',
                example: 'adddraw <opt>'
                },
            ownerOnly: true,
            args: [
                {
                    id: 'drawcost',
                    match: 'phrase',
                    otherwise: () => 'no draw cost defined!'
                },
                {
                    id: 'drawtitle',
                    match: 'phrase',
                    otherwise: () => 'no title defined!'
                },
                {
                    id: 'drawbestplayers',
                    match: 'phrase',
                    otherwise: () => 'no best players defined!'
                },
                {
                    id: 'drawreleasedate',
                    match: 'phrase',
                    otherwise: () => 'no release date defined!'
                },
                {
                    id: 'number',
                    match: 'phrase',
                    otherwise: () => 'no number defined!'
                },
                {
                    id: 'type',
                    match: 'phrase',
                    otherwise: () => 'no type defined'
                },
                {
                    id: 'percentagechance',
                    match: 'phrase',
                    otherwise: () => 'no percentage chance defined!'
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {

            await mongo().then(async (mongoose) => {
                try {
                    await drawSchema.findOneAndUpdate({
                        _id: args.number
                    }, {
                        _id: args.number,
                        information: ["**" + args.drawtitle + '**', "**Featured:** " + args.drawbestplayers, "**Cost:** " + args.drawcost, '**Publication Date:** ' + args.drawreleasedate, '**Black Ball Chances:** ' + args.percentagechance, args.type]
                    }, {
                        upsert: true
                    }
                    )
                    await console.log(`[MONGODB]: Parsed "` + args.drawtitle + `" as a new Draw.`)
                } finally {
                    mongoose.connection.close
                }
            })
            respond(src.success + ' set a new draw named **' + args.drawtitle + '**.', message)
            return;
            }
}
module.exports = NEWDRAW;