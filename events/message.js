const PREFIX = require('../config.json').prefix;

module.exports = (client, msg) => {
	if(msg.author.bot || !msg.guild) return;
	if(msg.content.startsWith(PREFIX) || msg.content.startsWith(`${client.user.toString()} `)) return require('../handle/command.js')(client, msg);
}
