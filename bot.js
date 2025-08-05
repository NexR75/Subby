const path = require('path');
require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');

// ASCII Art Banner
console.log(`


 _______  __   __  _______  _______  __   __ 
|       ||  | |  ||  _    ||  _    ||  | |  |
|  _____||  | |  || |_|   || |_|   ||  |_|  |
| |_____ |  |_|  ||       ||       ||       |
|_____  ||       ||  _   | |  _   | |_     _|
 _____| ||       || |_|   || |_|   |  |   |  
|_______||_______||_______||_______|  |___|  



            Made with ❤️ by NexR
`);

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();
client.prefix = process.env.PREFIX || '&';
client.verifyChannelId = process.env.VERIFY_CHANNEL_ID;
client.subscriberRoleId = process.env.SUBSCRIBER_ROLE_ID;
client.ownerId = process.env.OWNER_ID;

// Emoji constants
const EMOJIS = {
	tick: '<a:bd_tick:1402179534215843851>',
	cross: '<a:bd_cross:1402179512401133618>',
	loading: '<a:bd_loading:1402179517476503673>',
	ping: '<:bd_ping:1402179524321480714>',
	uptime: '<:bd_time:1402179536627568720>',
	reply_1: '<:bd_reply_1:1402179529040199845>',
	reply_2: '<:bd_reply_2:1402179526913425472>'
};

// Command loader
fs.readdirSync('./commands').forEach(file => {
	if (file.endsWith('.js')) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
});

// Event loader
fs.readdirSync('./events').forEach(file => {
	if (file.endsWith('.js')) {
		const event = require(`./events/${file}`);
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log(`${EMOJIS.tick} [MongoDB] Connected!`);
	}).catch(err => {
		console.error(`${EMOJIS.cross} [MongoDB] Connection Error:`, err);
	});

// Discord login
client.login(process.env.BOT_TOKEN).then(() => {
	console.log(`${EMOJIS.tick} [Discord] Bot logged in!`);
}).catch(err => {
	console.error(`${EMOJIS.cross} [Discord] Login Error:`, err);
});

client.on('ready', () => {
	console.log(`${EMOJIS.tick} [Discord] Bot is ready!`);
	client.user.setActivity('NexR <3', { type: 'STREAMING', url: 'https://twitch.tv/' });
});

module.exports = client;

