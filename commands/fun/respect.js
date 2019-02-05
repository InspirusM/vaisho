const { Attachment } = require('discord.js');
const readFile = require('util').promisify(require('fs').readFile);
const { Canvas } = require('canvas-constructor');

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if(!user) user = msg.author;

		const paintMess = await msg.channel.send('Painting...');
		const plate = await readFile('./assets/images/image_respects.png');
		const png = user.avatarURL.replace(/\.(gif|jpg|png|jpeg)\?size=(.+)/g, '.png?size=128');
		const { body } = await client.fetch.get(png);
		const giveRespect = new Canvas(720, 405)
		.addRect(0, 0, 720, 405)
		.setColor('#000000')
		.addImage(body, 110, 45, 90, 90)
		.addImage(plate, 0, 0, 720, 405)
		.toBuffer();
		await paintMess.delete();
		return msg.channel.send(new Attachment(giveRespect, 'respect.png'))
		.then(x => x.react('🇫'));
}

exports.conf = {
  aliases: [],
  clientPerm: 'ATTACH_FILES',
  authorPerm: ''
}

exports.help = {
  name: 'respect',
  description: 'Pay respects to someone.',
  usage: 'respect [@user | id ]',
  example: ['respect', 'respect @user', 'respect 2037335372786']
}
