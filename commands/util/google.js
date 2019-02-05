const { RichEmbed } = require('discord.js');
const { load } = require('cheerio');

exports.run = async (client, msg, args) => {
	const query = encodeURIComponent(args.join('+'));
	if(!query) return args.missing(msg, 'No query provided', this.help);
		const { body } = await client.fetch.get('http://google.com/search')
		.query({
			q: query,
			safe: 'active'
		});
		let $ = load(body);
		let results = [];
		
		$('.g').each((i) => results[i] = {});
		$('.g>.s>.st').each((i, e) => results[i]['value'] = getText(e));
		$('.g>.r>a').each((i, el) => {
			let raw = el.attribs['href'];
			results[i]['name'] = `[${getText(el)}](${raw.substr(7, raw.indexOf('&sa=U') - 7) || `https://www.google.com/search?q=${query}`})`;
		});
		
		results = results.filter(x => x.name && x.value).splice(0, 3);
		const embed = new RichEmbed()
		.setAuthor(`Result for ${args.join(' ')}`, 'http://i.imgur.com/b7k7puJ.jpg', `https://www.google.com/search?q=${query}`)
		.setColor('#E1FAFF')
		.setDescription(results.map(x => `${x.name}\n${x.value}`).join('\n'));
		
		return msg.channel.send(embed);
	}

function getText(children) {
  if (children.children) return getText(children.children);
  return children.map(c => {
    return c.children ? getText(c.children) : c.data;
  }).join('');
}

exports.conf = {
  aliases: ['gl'],
  clientPerm: '',
  authorPerm: ''
}

exports.help = {
  name: 'google',
  description: 'search something in google',
  usage: 'google <query>',
  example: ['google how to bake a cake']
}