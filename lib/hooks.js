const __CONFIG__ = require('../config')
const logger = require('../utils/logger')
const Bot = require('@kikinteractive/kik')
const moment = require('moment')
const DATA = require('./games');
const games = DATA.channel.games;

function log(json){
  console.dir(json,{colors:true});
}

const sample = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

function hooks(bot) {
  // [handler] on greeting
  bot.onTextMessage(/^hi|hello|bonjour|yo|sup$/i, (incoming, bot) => {
    incoming.reply(`Hello human. I'm ${__CONFIG__.kik.botUsername} 🤖`);
  });

  // [handler] on time
  bot.onTextMessage(/random game|another random game$/i, (incoming, next) => {
    var game = sample(games)
    //return incoming.reply(games[0].title)
    let keyboard = new Bot.ResponseKeyboard(['Another random game','Option 1', 'Option 2']);

    const gamelink = Bot.Message
      .link(game.link)
      //.setTitle(game.title)
      .setTitle("")
      .setText("Tap to Play Game!")
      .setPicUrl(game.teaserBig)
      .setAttributionIcon(game.thumb)
      .setAttributionName(game.title)
      //.addResponseKeyboard(keyboard)
      .addTextResponse(Bot.Response.friendPicker('Invite a friend'))
      .addTextResponse('Another random game2')
      .addTextResponse('Another random game3');

    //.setPicUrl(game.logo)
    //.setAttributionName(
    //.setAttributionName(game.title)
    //.addTextResponse('Hi!')

    const pic = Bot.Message.picture(game.screenshots.screenshoturl_1)
      //.setTitle(game.title)
      //.setTitle("")
      //.setText("")
      //.setPicUrl(game.teaserBig)
      //.setAttributionIcon(game.thumb)
      //.setAttributionName("gallery")
      //.addTextResponse('Another random game');

    return incoming.reply([
      '*** ' + game.title +' ***',
      gamelink,
      //Bot.Message.text("Tap above to play")
      //  .addTextResponse('Rate2 this game')
      //  .addTextResponse('Rate this game')
      //  .addTextResponse('Another random game')

      //"Rating: "+ game.rating,
      //Bot.Message.picture(game.screenshots.screenshoturl_1),
      //Bot.Message.picture(game.screenshots.screenshoturl_2),
      //Bot.Message.picture(game.screenshots.screenshoturl_3)//.addResponse(keyboard)

      //game.descriptions.filter(d => d.en)[0].en
    ]);
  })

  // [handler] on name
  bot.onTextMessage(/what is your name?$/i, (incoming, next) => {
    return incoming.reply(`My name is ${__CONFIG__.kik.botUsername}`)
  })

  // [handler] on incoming message
  bot.onTextMessage((incoming, next) => {
    //log(incoming);
    //bot.send(Bot.Message.picture('http://i.imgur.com/oalyVlU.jpg')
    //  .setAttributionName('Imgur')
    //  .setAttributionIcon('http://s.imgur.com/images/favicon-96x96.png'),
    //  incoming.from);

    const message = Bot.Message.text('🐣 Try me!')
      //.addTextResponse('Hi!')
      .addTextResponse('Random game')

    return incoming.reply(message)
  })

  // [handler] on subscribe to bot
  bot.onStartChattingMessage((incoming) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! Nice to meet you, I'll be your own personal assistant 🤖`)

        incoming.reply(message)
      });
  });
}

module.exports = hooks
