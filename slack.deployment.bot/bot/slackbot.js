'use strict';
var config = require('../config');
const Botkit = require('botkit');

var slackbot = function (){};

slackbot.prototype.helloworld = function(){
    console.log(config.slack.token);
}

slackbot.prototype.start = function(){
    // initialisation
		const slackController = Botkit.slackbot({
			// optional: wait for a confirmation events for each outgoing message before continuing to the next message in a conversation
			require_delivery: true
		});
		const slackBot = slackController.spawn({
			token: config.slack.token
		});
		// create rtm connection
		slackBot.startRTM((err, bot, payload) => {
			if (err) {
                console.log(err);
				throw new Error('Could not connect to Slack');
			}
			slackController.log('Slack connection established.');
		});
		// listener that handles incoming messages
		slackController.hears(['.*'], ['direct_message', 'direct_mention'], (bot, message) => {
			slackController.log('Slack message received');
			bot.reply(message, 'I have received your message!')
		});
}


module.exports = new slackbot();