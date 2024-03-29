const { Attachment } = require('discord.js');
const readFile = require('util').promisify(require('fs').readFile);
const { Canvas } = require('canvas-constructor');

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if(!user) user = msg.author;
		const paintMess = await msg.channel.send('Painting...');
		const plate = await readFile('./assets/images/plate_wanted.jpg');
		const png = user.avatarURL.replace(/\.gif.+/g, '.png');
		const { body } = await client.fetch.get(png);
		const getWanted = new Canvas(400, 562)
		.setColor('#000000')
		.addRect(0, 0, 400, 562)
		.addImage(plate, 0, 0, 400, 562)
		.addImage(body, 86, 178, 228, 228)
		.toBuffer();
		await paintMess.delete();
		return msg.channel.send(new Attachment(getWanted, 'wanted.png'));
}

exports.conf = {
  aliases: [],
  clientPerm: 'ATTACH_FILES',
  authorPerm: ''
}

exports.help = {
  name: 'wanted',
  description: 'Post a wanted picture of a user.',
  usage: 'wanted [@user | id ]',
  example: ['wanted', 'wanted @user', 'wanted 203733542282929']
}
