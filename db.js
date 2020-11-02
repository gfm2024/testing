const mongo = require('./mongo');
const userSchema = require('./schemas/user-schema.js');
const guildSchema = require('./schemas/guild-schema.js');
const src = require('./src.json')
const config = require('./config.json')
let colors = config.colors
async function dbUserUpdate(param, message) {
    await mongo().then(async (mongoose) => {
        try {
            await userSchema.findOneAndUpdate({
                _id: message.author.id
            }, {
                _id: message.author.id,
                userID: param
            }, {
                upsert: true
            })
            await console.log(`[MONGODB]: Parsed "` + param + `" into ${message.author.tag}'s IN GAME ID.`)
        } finally {
            mongoose.connection.close
        }
    })
}
async function statTypesUpdate(param, info, message) {
    await mongo().then(async (mongoose) => {
        try {
            await userSchema.findOneAndUpdate({
                _id: param
            }, {
                _id: param,
                statTypes: param
            }, {
                upsert: true
            })
            await console.log(`[MONGODB]: Parsed "` + param + `" into ${message.author.tag}'s IN GAME ID.`)
        } finally {
            mongoose.connection.close
        }
    })
}
async function mutedRoleUpdate(param, message) {
    await mongo().then(async (mongoose) => {
        try {
            await guildSchema.findOneAndUpdate({
                _id: message.guild.id
            }, {
                _id: message.guild.id,
                mutedRole: param
            }, {
                upsert: true
            })
            await console.log(`[MONGODB]: Parsed "` + param + `" into ${message.guild.name}'s MUTED ROLE..`)
        } finally {
            mongoose.connection.close
        }
    })
}
async function dbUserFind(id, text, resultsearchfor, message) {
let color = colors[Math.floor(Math.random() * colors.length)];	 
const mongo = require('./mongo.js');
const userSchema = require('./schemas/user-schema.js');
    await mongo().then(async (mongoose) => {
        try {
            const result = await userSchema.findOne({ _id: id });
            if(result === null) {
                return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + 'I couldn\'t find that database entry.', color: 'ff0000', timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
            }
            const variable = result[resultsearchfor]
            return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + text + '**' + variable + '**.', color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
        } finally {
            mongoose.connection.close()
        }
    })
}
async function dbFind(id, text, resultsearchfor, type, message) {
    let color = colors[Math.floor(Math.random() * colors.length)];	 
    const mongo = require('./mongo.js');
    const drawSchema = require('./schemas/draw-schema.js');
    const eventSchema = require('./schemas/event-schema.js');
    const guildSchema = require('./schemas/guild-schema.js');
    const userSchema = require('./schemas/user-schema.js');
        if(type === 'draws') {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await drawSchema.findOne({ _id: id });
                    if(result === null) {
                        return;
                    }
                    const variable = result[resultsearchfor]
                    message.channel.send(param + variable)
                } finally {
                    mongoose.connection.close()
                }
            })
            return;
        }
        if(type === 'users') {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await userSchema.findOne({ _id: id });
                    if(result === null) {
                        return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + 'I couldn\'t find that database entry.', color: 'ff0000', timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    const variable = result[resultsearchfor]
                    return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + text + '**' + variable + '**.', color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                } finally {
                    mongoose.connection.close()
                }
            })
            return;
        }
        if(type === 'guilds') {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await guildSchema.findOne({ _id: id });
                    if(result === null) {
                        return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + 'I couldn\'t find that database entry.', color: 'ff0000', timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    const variable = result[resultsearchfor]
                    return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + text + '**' + variable + '**.', color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                } finally {
                    mongoose.connection.close()
                }
            })
            return;
        }
        if(type === 'events') {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await eventSchema.findOne({ _id: id });
                    if(result === null) {
                        return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + 'I couldn\'t find that database entry.', color: 'ff0000', timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    const variable = result[resultsearchfor]
                    return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + text + '**' + variable + '**.', color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                } finally {
                    mongoose.connection.close()
                }
            })
            return;
        }
    }
    async function dbArrayFind(id, schema, count, message) {
        let color = colors[Math.floor(Math.random() * colors.length)];	 
        const drawSchema = require('./schemas/draw-schema.js');
        const statSchema = require('./schemas/stat-schema.js')
        if(schema === 'draw') {
        await mongo().then(async (mongoose) => {
            try {
                const result = await drawSchema.findOne({ _id: id });
                console.log(result)
                if(result === null) {
                    return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + 'I couldn\'t find that database entry.', color: 'ff0000', timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }
                const information = await result.information
                console.log(information)
                if(count === '1') {
                return message.channel.send({ embed : { description: information[0], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }
                if(count === '2') {
                    return message.channel.send({ embed : { description: information[0] + '\n' + information[1], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }
                if(count === '3') {
                    return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }
                if(count === '4') {
                    return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }
                if(count === '5') {
                    return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3] + '\n' + information[4], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }
                if(count === '6') {
                    return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3] + '\n' + information[4] + '\n' + information[5], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }
                if(count === '7') {
                    return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3] + '\n' + information[4] + '\n' + information[5] + '\n' + information[6], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                }                
            } finally {
                mongoose.connection.close()
            }
        })}
        if(schema === 'stat') {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await statSchema.findOne({ _id: id });
                    console.log(result)
                    if(result === null) {
                        return message.channel.send({ embed : { description: `**${message.author.tag}**, ` + 'I couldn\'t find that database entry.', color: 'ff0000', timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    const information = await result.information
                    console.log(information)
                    if(count === '1') {
                    return message.channel.send({ embed : { description: information[0], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    if(count === '2') {
                        return message.channel.send({ embed : { description: information[0] + '\n' + information[1], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    if(count === '3') {
                        return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    if(count === '4') {
                        return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    if(count === '5') {
                        return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3] + '\n' + information[4], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    if(count === '6') {
                        return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3] + '\n' + information[4] + '\n' + information[5], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }
                    if(count === '7') {
                        return message.channel.send({ embed : { description: information[0] + '\n' + information[1] + '\n' + information[2] + '\n' + information[3] + '\n' + information[4] + '\n' + information[5] + '\n' + information[6], color: color, timestamp: Date.now(), footer: { text: src.footertext, icon_url: src.footerimage } } })
                    }                
                } finally {
                    mongoose.connection.close()
                }
            })}
        return;
    }

module.exports = {
dbUserUpdate: dbUserUpdate,
mutedRoleUpdate: mutedRoleUpdate,
dbArrayFind: dbArrayFind,
dbFind: dbFind
}