const VerifiedUser = require('../models/VerifiedUser');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'verifiedusers',
	async execute(client, message, args, EMOJIS) {
		const isOwner = client.ownerId && message.author.id === client.ownerId;
		if (!isOwner && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			const embed = new EmbedBuilder()
				.setColor(0xED4245)
				.setDescription(`${EMOJIS.cross} Only the owner or an administrator can use this command.`)
				.setFooter({
					text: 'Made with ❤️ by NexR',
					iconURL: client.user.displayAvatarURL()
				});
			return message.reply({ embeds: [embed] });
		}

		console.log(`[VerifiedUsers] ${message.author.tag} requested verified users.`);
		const users = await VerifiedUser.find({ guildId: message.guild.id });
		const userList = users.map(u => u.username).join('\n') || 'None';
		const embed = new EmbedBuilder()
			.setColor(0x57F287)
			.setDescription(`${EMOJIS.tick} Total Verified Users: ${users.length}\n${userList}`);
		message.reply({ embeds: [embed], components: [] });
	}
};
