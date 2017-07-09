'use strict';
var config = require('../config');
const Botkit = require('botkit');

var slackbot = function (){};

slackbot.prototype.start = function(buildServer){
        var builds = buildServer;
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
		slackController.hears(['deploy review(.*)'], ['direct_message', 'direct_mention'], (bot, message) => {
			slackController.log('Deployment for "Review" requested.');
            // slackController.log('Deployment for "Review" requested. Parameter: "'+ match[1] + '"');
            var success = buildServer.deployReview();
            if(success){
                bot.reply(message, 'Ok, I\'ve started the deployment for "Review". :white_check_mark:');
            }
            else{                
			    bot.reply(message, 'Sorry. Something went wrong with the deployment for "Review". :warning:');
            }
		});        

        slackController.hears(['^(?!.*deploy).*$'], ['direct_message', 'direct_mention'], (bot, message) => {
			slackController.log('Slack message received. "' + message.text + '" from "' + message.user + '" Don\'t know what to do.');    
			bot.reply(message, 'I don\'t know what to do. :worried:');
		});
}


module.exports = new slackbot();