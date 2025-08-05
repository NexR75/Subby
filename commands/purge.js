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
	name: 'purge',
	async execute(client, message) {
		const isOwner = client.ownerId && message.author.id === client.ownerId;
		if (!isOwner && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			const embed = embedMsg({
				color: 0xED4245,
				description: `${EMOJIS.cross} Only the owner or an administrator can use this command.`
			}, client);
			return message.reply({ embeds: [embed] });
		}

		let deleted = 0;
		let lastId;
		while (true) {
			const fetched = await message.channel.messages.fetch({ limit: 100, before: lastId }).catch(() => null);
			if (!fetched || fetched.size === 0) break;
			await message.channel.bulkDelete(fetched, true).catch(() => {});
			deleted += fetched.size;
			lastId = fetched.last()?.id;
			if (fetched.size < 100) break;
		}

		const embed = embedMsg({
			color: 0x57F287,
			description: `${EMOJIS.tick} Purged all messages in this channel.`
		}, client);
		await message.channel.send({ embeds: [embed] });
	}
};
