const { Command } = require('discord-akairo');
const util = require('util');
const { noTagRespond, respond } = require('../respond');
const puppeteer = require('puppeteer');
const src = require('../src.json')
const mongo = require('../mongo.js')
const newsSchema = require('../schemas/news-schema');


class Stats extends Command {
    constructor() {
        super('updatenews', {
            aliases: ['updatenews'],
            description: {
                description: 'update all Konami news articles.',
                usage: 'updatenews',
                example: 'updatenews'
                },
            ownerOnly: true,
            args: [
            ]
        });
    }

    async exec(message, args) {

        (async () => {

            const browser = await puppeteer.launch()
            const page = await browser.newPage() 
            await page.goto('https://www.konami.com/wepes/mobile/en/#');
            await page.screenshot({path: 'test.png'});
            const titleOneHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[2]/header/span[3]`)
            const titleOne = await page.evaluate(el => el.textContent, titleOneHandle[0])
            const descriptionOneHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[2]/div/p`)
            const descriptionOne = await page.evaluate(el => el.textContent, descriptionOneHandle[0])
            const typeOneHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[2]/header/span[2]`)
            const typeOne = await page.evaluate(el => el.textContent, typeOneHandle[0])
            const publicationDateOneHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[2]/header/span[1]`)
            const publicationDateOne = await page.evaluate(el => el.textContent, publicationDateOneHandle[0])

            const titleTwoHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[3]/header/span[3]`)
            const titleTwo = await page.evaluate(el => el.textContent, titleTwoHandle[0])
            const descriptionTwoHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[3]/div/p`)
            const descriptionTwo = await page.evaluate(el => el.textContent, descriptionTwoHandle[0])
            const typeTwoHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[3]/header/span[2]`)
            const typeTwo = await page.evaluate(el => el.textContent, typeTwoHandle[0])
            const publicationDateTwoHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[3]/header/span[1]`)
            const publicationDateTwo = await page.evaluate(el => el.textContent, publicationDateTwoHandle[0])

            const titleThreeHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[4]/header/span[3]`)
            const titleThree = await page.evaluate(el => el.textContent, titleThreeHandle[0])
            const descriptionThreeHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[4]/div/p`)
            const descriptionThree = await page.evaluate(el => el.textContent, descriptionThreeHandle[0])
            const typeThreeHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[4]/header/span[2]`)
            const typeThree = await page.evaluate(el => el.textContent, typeThreeHandle[0])
            const publicationDateThreeHandle = await page.$x(`/html/body/div[1]/div[2]/article/section/ul[1]/li[4]/header/span[1]`)
            const publicationDateThree = await page.evaluate(el => el.textContent, publicationDateThreeHandle[0])

            await mongo().then(async (mongoose) => {
                try {
                    await newsSchema.findOneAndUpdate({
                        _id: '1'
                    }, {
                        _id: '1',
                        title: titleOne,
                        description: descriptionOne,
                        type: typeOne,
                        date: publicationDateOne
                    },
                    {
                        upsert: true
                    }
                    )
                    await newsSchema.findOneAndUpdate({
                        _id: '2'
                    }, {
                        _id: '2',
                        title: titleTwo,
                        description: descriptionTwo,
                        type: typeTwo,
                        date: publicationDateTwo
                    },
                    {
                        upsert: true
                    }
                    )
                    await newsSchema.findOneAndUpdate({
                        _id: '3'
                    }, {
                        _id: '3',
                        title: titleThree,
                        description: descriptionThree,
                        type: typeThree,
                        date: publicationDateThree
                    },
                    {
                        upsert: true
                    }
                    )
                    await console.log(`[MONGODB]: Parsed new NEWS DATA into NEWS branch.`)
                    respond(src.success + ' updated all Konami news articles.', message)
                } finally {
                    mongoose.connection.close
                }
            })
            /*// DEPRECATED
            message.channel.send(publicationDateOne)
            message.channel.send(titleOne)
            message.channel.send(descriptionOne)
            message.channel.send(typeOne)
            //*/
            await browser.close();

        }) ();

        }
}
module.exports = Stats;