var config = {};
config.slack = {};

config.slack.token = process.env.SLACK_TOKEN || '[token]';
config.slack.oauth = process.env.SLACK_OAUTH || '[oauth]';

module.exports = config;