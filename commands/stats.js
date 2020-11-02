const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const { error, noTagRespond, respond } = require('../respond');
const mongo = require('../mongo.js');
const src = require('../src.json')
const puppeteer = require('puppeteer')
const playerSchema = require('../schemas/player-schema.js');
const { DiscordAPIError } = require('discord.js');
class PLAYERINFO extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats'],
            description: {
                description: 'view specific stats about a player.',
                usage: 'stats <player> <type>',
                example: 'stats Hazard attacking'
                },
            args: [
                {
                    id: 'name',
                    type: 'phrase',
                    otherwise: (message) => error(`you didn't specify a player name.`, message)


                },
                {
                    id: 'type',
                    type: 'phrase',
                    otherwise: (message) => error("you didn't specify a stat type. Use ``$stattypes`` for more information.", message)

                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        const config = require('../config.json')
        let facts = config.facts
        let fact = facts[Math.floor(Math.random() * facts.length)];

        let colors = config.colors
        let color = colors[Math.floor(Math.random() * colors.length)];
         //switch
                        (async () => {
                            console.log(args.name)
                            const didyouknow = new Discord.MessageEmbed()
                            .setTitle(`Searching the database for ` + args.name + '...')
                            .setDescription(`While you're here, did you know that **` + fact + '**?')
                            .setColor(color)
                            .setFooter(src.footertext, src.footerimage)
                            const delMessage = await message.channel.send(didyouknow)
                            message.channel.startTyping();
                        const browser = await puppeteer.launch()
                        const page = await browser.newPage() 

                        await page.goto('https://pesdb.net/pes2021/?name=' + args.name + '&sort=id&order=a');
                        await page.screenshot({path: 'test.png'})
                        let idHandle = await page.$x(`/html/body/div[2]/div[3]/div[2]/table/tbody/tr[2]/td[1]`)
                        console.log('IDHANDLE' + idHandle)
                        let id = await page.evaluate(el => el.textContent, idHandle[0]).catch(e => error(`This player does not exist.`, message))
                        console.log('ID:' + id)
                        console.log('LENGTH:' + id.length)
                        if(id.length === undefined) {
                            await message.channel.stopTyping()
                            await delMessage.delete()
                            return;
                        }
                        //await page.goto('https://pesdb.net/pes2021/?id=' + id);
                        await mongo().then(async (mongoose) => {
    
                            try {


                                const cache = {} 
                                let data = cache[args.phrase]
                        const result = await playerSchema.findOne({ _id: id });
                        if(result === null) {

                            await page.goto('https://pesdb.net/pes2021/?id=' + id);
                            const playerDisplayImage = 'https://www.pesuniverse.com/wp-content/plugins/players-database/assets/images/players/' + id + '.png'
                            const playernameHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[1]/table/tbody/tr[1]/td`)
                            const playerName = await page.evaluate(el => el.textContent, playernameHandle[0])
                            const teamnameHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[1]/table/tbody/tr[3]/td/a`)
                            const playerTeam = await page.evaluate(el => el.textContent, teamnameHandle[0])
                            const playerLeagueHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[1]/table/tbody/tr[4]/td/a`)
                            const playerLeague = await page.evaluate(el => el.textContent, playerLeagueHandle[0])
                            const regionHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[1]/table/tbody/tr[6]/td/a`)
                            const playerRegion = await page.evaluate(el => el.textContent, regionHandle[0])
                            const ageHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[1]/table/tbody/tr[9]/td`)
                            const playerAge = await page.evaluate(el => el.textContent, ageHandle[0])
                            const footHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[1]/table/tbody/tr[10]/td`)
                            const playerFoot = await page.evaluate(el => el.textContent, footHandle[0])
                            const positionHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[1]/table/tbody/tr[12]/td/div`)
                            const playerPosition = await page.evaluate(el => el.textContent, positionHandle[0])
                            const ratingHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[3]/table/tbody/tr[16]/td/span`)
                            const playerRating = await page.evaluate(el => el.textContent, ratingHandle[0])
                            const playerStyleHandler = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[4]/table/tbody/tr[2]/td`)
                            const playerPlayerStyle = await page.evaluate(el => el.textContent, playerStyleHandler[0]) 
                            const playerOffensiveAwarenessHandle = await page.$x(`//*[@id="a0"]`)
                            const newPlayerOffensiveAwareness = await page.evaluate(el => el.textContent, playerOffensiveAwarenessHandle[0]) 
                            const playerBallControlHandle = await page.$x(`//*[@id="a1"]`)
                            const playerBallControl = await page.evaluate(el => el.textContent, playerBallControlHandle[0]) 
                            const playerDribblingHandle = await page.$x(`//*[@id="a2"]`)
                            const playerDribbling = await page.evaluate(el => el.textContent, playerDribblingHandle[0]) 
                            const playerTightPosessionHandle = await page.$x(`//*[@id="a3"]`)
                            const playerTightPosession = await page.evaluate(el => el.textContent, playerTightPosessionHandle[0])       
                            const playerLowPassHandle = await page.$x(`//*[@id="a4"]`)
                            const playerLowPass = await page.evaluate(el => el.textContent, playerLowPassHandle[0])       
                            const playerLoftedPassHandle = await page.$x(`//*[@id="a5"]`)
                            const playerLoftedPass = await page.evaluate(el => el.textContent, playerLoftedPassHandle[0])       
                            const playerFinishingHandle = await page.$x(`//*[@id="a6"]`)
                            const playerFinishing = await page.evaluate(el => el.textContent, playerFinishingHandle[0])       
                            const playerHeadingHandle = await page.$x(`//*[@id="a7"]`)
                            const playerHeading = await page.evaluate(el => el.textContent, playerHeadingHandle[0]) 
                            const playerPlaceKickingHandle = await page.$x(`//*[@id="a8"]`)
                            const playerPlaceKicking = await page.evaluate(el => el.textContent, playerPlaceKickingHandle[0]) 
                            const playerCurlHandle = await page.$x(`//*[@id="a9"]`)
                            const playerCurl = await page.evaluate(el => el.textContent, playerCurlHandle[0]) 
                            const playerSpeedHandle = await page.$x(`//*[@id="a10"]`)
                            const playerSpeed = await page.evaluate(el => el.textContent, playerSpeedHandle[0]) 
                            const playerAccelerationHandle = await page.$x(`//*[@id="a11"]`)
                            const playerAcceleration = await page.evaluate(el => el.textContent, playerAccelerationHandle[0]) 
                            const playerKickingPowerHandle = await page.$x(`//*[@id="a12"]`)
                            const playerKickingPower = await page.evaluate(el => el.textContent, playerKickingPowerHandle[0]) 
                            const playerJumpHandle = await page.$x(`//*[@id="a13"]`)
                            const playerJump = await page.evaluate(el => el.textContent, playerJumpHandle[0]) 
                            const playerPhysicalContactHandle = await page.$x(`//*[@id="a14"]`)
                            const playerPhysicalContact = await page.evaluate(el => el.textContent, playerPhysicalContactHandle[0]) 
                            const playerBalanceHandle = await page.$x(`//*[@id="a15"]`)
                            const playerBalance = await page.evaluate(el => el.textContent, playerBalanceHandle[0]) 
                            const playerStaminaHandle = await page.$x(`//*[@id="a16"]`)
                            const playerStamina = await page.evaluate(el => el.textContent, playerStaminaHandle[0]) 
                            const playerDefensiveAwarenessHandle = await page.$x(`//*[@id="a17"]`)
                            const playerDefensiveAwareness = await page.evaluate(el => el.textContent, playerDefensiveAwarenessHandle[0]) 
                            const playerBallWinningHandle = await page.$x(`//*[@id="a18"]`)
                            const playerBallWinning = await page.evaluate(el => el.textContent, playerBallWinningHandle[0]) 
                            const playerAggressionHandle = await page.$x(`//*[@id="a19"]`)
                            const playerAggression = await page.evaluate(el => el.textContent, playerAggressionHandle[0]) 
                            const playerWFUsageHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[3]/table/tbody/tr[10]/td`)
                            const playerWFUsage = await page.evaluate(el => el.textContent, playerWFUsageHandle[0]) 
                            const playerWFAccuracyHandle = await page.$x(`/html/body/div[2]/div[3]/table/tbody/tr[1]/td[3]/table/tbody/tr[11]/td`)
                            const playerWFAccuracy = await page.evaluate(el => el.textContent, playerWFAccuracyHandle[0]) 

                            if(args.type === 'attacking') {
                                console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                                await delMessage.delete()
                                message.channel.stopTyping()
                                const embed = new Discord.MessageEmbed()
                                .setDescription('**' + playerName + '**:')
                                .addField(`Tight Possession:`, playerTightPosession)
                                .addField(`Offensive Awareness:`, newPlayerOffensiveAwareness)
                                .addField(`Ball Control:`, playerBallControl)
                                .addField(`Heading:`, playerHeading)
                                .setThumbnail(playerDisplayImage)
                                .setColor(color)
                                .setFooter(src.footertext, src.footerimage)
                                message.channel.send(embed)
                            }
                            if(args.type === 'dribbling') {
                                console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                                await delMessage.delete()
                                message.channel.stopTyping()
                                const embed = new Discord.MessageEmbed()
                                .setDescription('**' + playerName + '**:')
                                .addField(`Dribbling:`, playerDribbling)
                                .addField(`Ball Control:`, playerBallControl)
                                .addField(`Low Pass:`, playerLowPass)
                                .addField(`Lofted Pass:`, playerLoftedPass)
                                .setThumbnail(playerDisplayImage)
                                .setColor(color)
                                .setFooter(src.footertext, src.footerimage)
                                message.channel.send(embed)
                            }
                            if(args.type === 'shooting') {
                                console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                                await delMessage.delete()
                                message.channel.stopTyping()
                                const embed = new Discord.MessageEmbed()
                                .setDescription('**' + playerName + '**:')
                                .addField(`Finishing:`, playerFinishing)
                                .addField(`Curl:`, playerCurl)
                                .addField(`Place Kicking:`, playerPlaceKicking)
                                .addField(`Kicking Power:`, playerKickingPower)
                                .setThumbnail(playerDisplayImage)
                                .setColor(color)
                                .setFooter(src.footertext, src.footerimage)
                                message.channel.send(embed)
                            }
                            if(args.type === 'physical') {
                                console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                                await delMessage.delete()
                                message.channel.stopTyping()
                                const embed = new Discord.MessageEmbed()
                                .setDescription('**' + playerName + '**:')
                                .addField(`Speed:`, playerSpeed)
                                .addField(`Acceleration:`, playerAcceleration)
                                .addField(`Physical Contact:`, playerPhysicalContact)
                                .addField(`Aggression:`, playerAggression)
                                .setThumbnail(playerDisplayImage)
                                .setColor(color)
                                .setFooter(src.footertext, src.footerimage)
                                message.channel.send(embed)
                            }
                            if(args.type === 'general') {
                                console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                                await delMessage.delete()
                                message.channel.stopTyping()
                                const embed = new Discord.MessageEmbed()
                                .setDescription('**' + playerName + '**:')
                                .addField(`Jump:`, playerJump)
                                .addField(`Balance:`, playerBalance)
                                .addField(`Stamina:`, playerStamina)
                                .addField(`Ball Winning:`, playerBallWinning)
                                .setThumbnail(playerDisplayImage)
                                .setColor(color)
                                .setFooter(src.footertext, src.footerimage)
                                message.channel.send(embed)
                                
                            } 

                            await playerSchema.findOneAndUpdate({
                                _id: id
                            }, {
                                _id: id,
                                name: playerName,
                                team: playerTeam,
                                league: playerLeague,
                                region: playerRegion,
                                //height: playerHeight,
                                //weight: playerWeight,
                                age: playerAge,
                                foot: playerFoot,
                                position: playerPosition,
                                rating: playerRating,
                                playingstyle: playerPlayerStyle,
                                image: playerDisplayImage,
                                offensiveawareness: newPlayerOffensiveAwareness,
                                ballcontrol: playerBallControl,
                                dribbling: playerDribbling,
                                tightposession: playerTightPosession,
                                lowpass: playerLowPass,
                                loftedpass: playerLoftedPass,
                                finishing: playerFinishing,
                                heading: playerHeading,
                                placekicking: playerPlaceKicking,
                                curl: playerCurl,
                                speed: playerSpeed,
                                acceleration: playerAcceleration,
                                kickingpower: playerKickingPower,
                                jump: playerJump,
                                physicalcontact: playerPhysicalContact,
                                balance: playerBalance,
                                stamina: playerStamina,
                                defensiveawareness: playerDefensiveAwareness,
                                ballwinning: playerBallWinning,
                                aggression: playerAggression,
                                weakfootusage: playerWFUsage,
                                weakfootaccuracy: playerWFAccuracy
                            }, {
                                upsert: true
                            })
                            //noTagRespond('**' + playerName + '**\n\n' + '**Team: **' + playerTeam + '\n**League: **' + playerLeague + '\n**Region: **' + playerRegion + '\n**Age: **' + playerAge + '\n**Foot: **' + playerFoot + '\n**Position: **' + playerPosition + '\n**Rating: **' + playerRating, message)

                                message.channel.stopTyping()
                             return;
                        }
                        if(args.type === 'attacking') {
                            cache[args.content] = data = [result.name]
                            const name = data[0]
                            cache[args.content] = data = [result.offensiveawareness]
                            const offensiveawareness = data[0]
                            cache[args.content] = data = [result.ballcontrol]
                            const ballcontrol = data[0]
                            cache[args.content] = data = [result.heading]
                            const heading = data[0]
                            cache[args.content] = data = [result.image]
                            const image = data[0]
                            cache[args.content] = data = [result.tightposession]
                            const tightposession = data[0]
                            console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                            await delMessage.delete()
                            message.channel.stopTyping()
                            const embed = new Discord.MessageEmbed()
                            .setDescription('**' + name + '**:')
                            .addField(`Tight Possession:`, tightposession)
                            .addField(`Offensive Awareness:`, offensiveawareness)
                            .addField(`Ball Control:`, ballcontrol)
                            .addField(`Heading:`, heading)
                            .setThumbnail(image)
                            .setColor(color)
                            .setFooter(src.footertext, src.footerimage)
                            message.channel.send(embed)
                            return;
                        }
                        if(args.type === 'dribbling') {
                            cache[args.content] = data = [result.name]
                            const name = data[0]
                            cache[args.content] = data = [result.image]
                            const image = data[0]
                            cache[args.content] = data = [result.ballcontrol]
                            const ballcontrol = data[0]
                            cache[args.content] = data = [result.dribbling]
                            const dribbling = data[0]
                            cache[args.content] = data = [result.lowpass]
                            const lowpass = data[0]
                            cache[args.content] = data = [result.loftedpass]
                            const loftedpass = data[0]
                            console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                            await delMessage.delete()
                            message.channel.stopTyping()
                            const embed = new Discord.MessageEmbed()
                            .setDescription('**' + name + '**:')
                            .addField(`Dribbling:`, dribbling)
                            .addField(`Ball Control:`, ballcontrol)
                            .addField(`Low Pass:`, lowpass)
                            .addField(`Lofted Pass:`, loftedpass)
                            .setThumbnail(image)
                            .setColor(color)
                            .setFooter(src.footertext, src.footerimage)
                            message.channel.send(embed)
                            return;
                        }
                        if(args.type === 'shooting') {
                            cache[args.content] = data = [result.name]
                            const name = data[0]
                            cache[args.content] = data = [result.image]
                            const image = data[0]
                            cache[args.content] = data = [result.finishing]
                            const finishing = data[0]
                            cache[args.content] = data = [result.curl]
                            const curl = data[0]
                            cache[args.content] = data = [result.placekicking]
                            const placekicking = data[0]
                            cache[args.content] = data = [result.kickingpower]
                            const kickingpower = data[0]
                            console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                            await delMessage.delete()
                            message.channel.stopTyping()
                            const embed = new Discord.MessageEmbed()
                            .setDescription('**' + name + '**:')
                            .addField(`Finishing:`, finishing)
                            .addField(`Curl:`, curl)
                            .addField(`Place Kicking:`, placekicking)
                            .addField(`Kicking Power:`, kickingpower)
                            .setThumbnail(image)
                            .setColor(color)
                            .setFooter(src.footertext, src.footerimage)
                            message.channel.send(embed)
                            return;
                        }
                        if(args.type === 'physical') {
                            cache[args.content] = data = [result.name]
                            const name = data[0]
                            cache[args.content] = data = [result.image]
                            const image = data[0]
                            cache[args.content] = data = [result.speed]
                            const speed = data[0]
                            cache[args.content] = data = [result.acceleration]
                            const acceleration = data[0]
                            cache[args.content] = data = [result.physicalcontact]
                            const physicalcontact = data[0]
                            cache[args.content] = data = [result.aggression]
                            const aggression = data[0]
                            console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                            await delMessage.delete()
                            message.channel.stopTyping()
                            const embed = new Discord.MessageEmbed()
                            .setDescription('**' + name + '**:')
                            .addField(`Speed:`, speed)
                            .addField(`Acceleration:`, acceleration)
                            .addField(`Physical Contact:`, physicalcontact)
                            .addField(`Aggression:`, aggression)
                            .setThumbnail(image)
                            .setColor(color)
                            .setFooter(src.footertext, src.footerimage)
                            message.channel.send(embed)
                            return;
                        }
                        if(args.type === 'general') {
                            cache[args.content] = data = [result.name]
                            const name = data[0]
                            cache[args.content] = data = [result.image]
                            const image = data[0]
                            cache[args.content] = data = [result.jump]
                            const jump = data[0]
                            cache[args.content] = data = [result.balance]
                            const balance = data[0]
                            cache[args.content] = data = [result.stamina]
                            const stamina = data[0]
                            cache[args.content] = data = [result.ballwinning]
                            const ballwinning = data[0]
                            console.log(`[FETCH]: Fetched PLAYER DATA from MONGODB.`)
                            await delMessage.delete()
                            message.channel.stopTyping()
                            const embed = new Discord.MessageEmbed()
                            .setDescription('**' + name + '**:')
                            .addField(`Jump:`, jump)
                            .addField(`Balance:`, balance)
                            .addField(`Stamina:`, stamina)
                            .addField(`Ball Winning:`, ballwinning)
                            .setThumbnail(image)
                            .setColor(color)
                            .setFooter(src.footertext, src.footerimage)
                            message.channel.send(embed)
                            return;
                        }

                        await delMessage.delete()
                        error(src.invalidstattype, message)
                        //return noTagRespond('**' + title  + '**\n\n*' + description + '*\n\n**Publication Date:** ' + date + '\n**Announcement Type: **' + type, message)
                    } finally {
                        mongoose.connection.close()
                    }
 
                
                })

                    }) ();

        return;
        }
}
module.exports = PLAYERINFO;