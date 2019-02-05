exports.run = async (client, msg, args) => {
		args = args.join(' ') || 'What text you want to reversed?';
		let reversed = '';
		for(let i = args.length-1; i >= 0; i--){
			reversed += args[i];
		}
		return msg.channel.send(reversed);
}

exports.conf = {
  aliases: [],
  clientPerm: '',
  authorPerm: ''
}

exports.help = {
  name: 'reversed',
  description: 'Reverse the text',
  usage: 'reversed [text]',
  example: ['reversed', 'reversed hello']
}
