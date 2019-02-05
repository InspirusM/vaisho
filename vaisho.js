const vaishoClient = require('./handle/vaishoClient.js');

const client = new vaishoClient({
  fetchAllMember: true,
  disableEveryone: true
});

require('./handle/events')(client);

client.login(process.env.TOKEN);

