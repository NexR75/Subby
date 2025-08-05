const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	async execute(client, message, args, EMOJIS) {
		const embed = new EmbedBuilder()
			.setColor(0x5865F2)
			.setTitle(`<:bd_code:1402179509859651669> Subby Bot Commands`)
			.setDescription([
				`${EMOJIS.reply_2} \`&purge\` — Delete all messages in the channel `,
				`${EMOJIS.reply_2} \`&delete role\` — Remove subscriber role from all verified users `,
				`${EMOJIS.reply_2} \`&verifiedusers\` — List all verified users `,
				`${EMOJIS.reply_2} \`&ping\` — Show bot latency`,
				`${EMOJIS.reply_2} \`&uptime\` — Show bot uptime`,
				`${EMOJIS.reply_1} \`&help\` — Show this help message`
			].join('\n'))
			.setFooter({
				text: 'Made with ❤️ by NexR',
				iconURL: client.user.displayAvatarURL()
			});
		await message.reply({ embeds: [embed] });
	}
};
