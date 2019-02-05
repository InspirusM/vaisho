const { Client, Collection } = require('discord.js');
const modules = require('./module');

class vaishoClient extends Client{
  constructor(opt){
    super(opt);
    this.prefix = '%'
    this.commands = modules.commands;
    this.aliases = modules.aliases;
    this.helps = modules.helps;
    this.fetch = require('node-superfetch');
    this.util = require('./util.js');
    this.queue = new Collection();
    this.logger = new (require('./logger'))();
    this.health = Object.seal({
      cpu: new Array(96).fill(0),
      prc: new Array(96).fill(0),
      ram: new Array(96).fill(0),
      cmd: new Array(96).fill(0)
    });
  }
  updateStats() {
    const { heapTotal, heapUsed } = process.memoryUsage();
    const { loadavg } = require('os');
    this.health.cpu.shift();
    this.health.cpu.push(((loadavg()[0] * 10000) | 0) / 100);
    
    this.health.prc.shift();
    this.health.prc.push(((100 * (heapTotal / 1048576)) | 0) / 100);
    
    this.health.ram.shift();
		this.health.ram.push(((100 * (heapUsed / 1048576)) | 0) / 100);

		this.health.cmd.shift();
		this.health.cmd.push(0);
  }
}

module.exports = vaishoClient;