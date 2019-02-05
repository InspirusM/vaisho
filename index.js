const { ShardingManager } = require('discord.js');
const sharding = new ShardingManager('./vaisho.js',{
  totalShards: 1,
  token: process.env.TOKEN
});

shard.on('launch', shard => {
  console.log(`💎Launching Shard ${shard.id} [ ${shard.id + 1} of ${sharding.totalShards} ]`);
});
shard.on('message', (shard, msg) => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${shard._result}`);
});
shard.spawn();

//require('./server.js');

process.on('unhandledRejection', e => console.error(e))
.on('uncaughtException', e => console.error(e));
