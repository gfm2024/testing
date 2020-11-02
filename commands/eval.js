const { Command } = require('discord-akairo'); const Discord = require('discord.js'); let responding = require('../respond.js'); let error = responding.error; let respond = responding.respond; let sendAuthor = responding.sendAuthor; const fs = require('fs'); let srcdata = fs.readFileSync('src.json'); let src = JSON.parse(srcdata);
class EvalCommand extends Command {
 constructor() {
  super('eval', {
   aliases: ['eval'],
   description: {
    description: 'evaluate DJS code.',
    usage: 'eval <OPTIONS>',
    example: 'eval client.token'
    },
   ownerOnly: true
  });
 }
 async exec(message, client) {
  let args = message.content.slice('$'.length).split(/ +/);
 const config = require('../config.json')
  function formatEvalResult(cmd, result, color, e = false) {
   const embed = new Discord.MessageEmbed()
    .setColor(color)
    .addField("Eval", "```js\n" + cmd + "```")
    .addField(e ? "Error" : "Result", "```js\n" + result + "```");
   return embed;
  }
  const cmd = message.content.substring(('$' + "eval").length + 1);
  let result = eval(cmd);
  if (result instanceof Promise) {
   result = await result;
  }
  message.channel.send(formatEvalResult(cmd, result, 0x00FF00));
 } catch (e) {
  message.channel.send(formatEvalResult(cmd, result, 0xFF0000, true));
 }
}
module.exports = EvalCommand;
