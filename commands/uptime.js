const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'uptime',
	async execute(client, message, args, EMOJIS) {
		console.log(`[Uptime] ${message.author.tag} requested uptime.`);
		const uptime = process.uptime();
		const hours = Math.floor(uptime / 3600);
		const minutes = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);
		const embed = new EmbedBuilder()
			.setColor(0x5865F2)
			.setDescription(`${EMOJIS.uptime} Uptime: ${hours}h ${minutes}m ${seconds}s`);
		message.reply({ embeds: [embed], components: [] });
	}
};
