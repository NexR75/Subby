const VerifiedUser = require('../models/VerifiedUser');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

const EMOJIS = {
	tick: '<a:bd_tick:1402179534215843851>',
	cross: '<a:bd_cross:1402179512401133618>',
};

function embedMsg({ color, description }, client) {
	return new EmbedBuilder()
		.setColor(color)
		.setDescription(description)
		.setFooter({
			text: 'Made with ❤️ by NexR',
			iconURL: client.user.displayAvatarURL()
		});
}

module.exports = {
	name: 'delete',
	async execute(client, message, args) {
		const isOwner = client.ownerId && message.author.id === client.ownerId;
		if (!args[0] || args[0].toLowerCase() !== 'role') return;
		if (!isOwner && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			const embed = embedMsg({
				color: 0xED4245,
				description: `${EMOJIS.cross} Only the owner or an administrator can use this command.`
			}, client);
			return message.reply({ embeds: [embed] });
		}
		const roleId = client.subscriberRoleId;
		if (!roleId) {
			const embed = embedMsg({
				color: 0xED4245,
				description: `${EMOJIS.cross} Subscriber role ID is not set.`
			}, client);
			return message.reply({ embeds: [embed] });
		}
		const users = await VerifiedUser.find({ guildId: message.guild.id });
		let count = 0;
		for (const user of users) {
			const member = await message.guild.members.fetch(user.userId).catch(() => null);
			if (member && member.roles.cache.has(roleId)) {
				await member.roles.remove(roleId).catch(() => {});
				count++;
			}
		}
		const embed = embedMsg({
			color: 0x57F287,
			description: `${EMOJIS.tick} Removed the subscriber role from ${count} users.`
		}, client);
		await message.reply({ embeds: [embed] });
	}
};
