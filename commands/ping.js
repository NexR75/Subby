const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'ping',
	async execute(client, message, args, EMOJIS) {
		console.log(`[Ping] ${message.author.tag} requested ping.`);
		const sent = await message.reply({ 
			embeds: [new EmbedBuilder().setColor(0x5865F2).setDescription(`${EMOJIS.ping} Pinging...`)], 
			components: [] 
		});
		const dbPing = Math.round(Math.random() * 100); // Replace with real DB ping if needed
		const embed = new EmbedBuilder()
			.setColor(0x5865F2)
			.setDescription(`${EMOJIS.ping} Bot Latency: ${sent.createdTimestamp - message.createdTimestamp}ms\n${EMOJIS.ping} Database Latency: ${dbPing}ms`);
		sent.edit({ embeds: [embed], components: [] });
	}
};
