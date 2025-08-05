const Config = require('../models/Config');
const { ActionRowBuilder, ChannelSelectMenuBuilder, RoleSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'ytverify',
	async execute(client, message, args) {
		// Only the 'setup' subcommand is admin-only
		if (!args[0] || args[0] !== 'setup') return;

		if (!message.member.permissions.has('Administrator')) {
			console.log(`[ytverify] ${message.author.tag} tried setup without permission.`);
			return message.reply({
				components: [],
				content: `${client.getEmoji('cross')} Only administrators can run this command.`
			});
		}

		console.log(`[ytverify] Setup started by ${message.author.tag}`);

		const channelRow = new ActionRowBuilder().addComponents(
			new ChannelSelectMenuBuilder()
				.setCustomId('verify_channel_select')
				.setPlaceholder('Select the verification channel')
				.setMaxValues(1)
				.setMinValues(1)
		);

		await message.reply({
			content: `${client.getEmoji('loading')} Please select the channel where users will send their YouTube subscription screenshots.`,
			components: [channelRow]
		});
	}
};

