const Config = require('../models/Config');
const { ActionRowBuilder, RoleSelectMenuBuilder } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
		const emojis = client;
		if (!interaction.isChannelSelectMenu() && !interaction.isRoleSelectMenu()) return;

		if (interaction.customId === 'verify_channel_select') {
			const channelId = interaction.values[0];
			console.log(`[Setup] Channel selected: ${channelId}`);
			// Ask for role
			const roleRow = new ActionRowBuilder().addComponents(
				new RoleSelectMenuBuilder()
					.setCustomId('verify_role_select')
					.setPlaceholder('Select the role for verified users')
					.setMaxValues(25) // Show up to 25 roles (Discord API limit)
					.setMinValues(1)
			);
			await interaction.reply({
				content: `${client.getEmoji('loading')} Now select the role that should be given to verified users.`,
				components: [roleRow],
				ephemeral: true
			});
			// Store channelId in interaction.user.id cache (in-memory or DB as needed)
			client._setupCache = client._setupCache || {};
			client._setupCache[interaction.user.id] = { channelId };
		} else if (interaction.customId === 'verify_role_select') {
			const roleId = interaction.values[0];
			const cache = client._setupCache?.[interaction.user.id];
			if (!cache) {
				console.error('[Setup] Setup session expired.');
				return interaction.reply({ content: `${client.getEmoji('cross')} Setup session expired.`, ephemeral: true });
			}
			await Config.updateOne(
				{ guildId: interaction.guild.id },
				{ $set: { verifyChannelId: cache.channelId, verifyRoleId: roleId } },
				{ upsert: true }
			);
			delete client._setupCache[interaction.user.id];
			console.log(`[Setup] Setup completed for guild ${interaction.guild.id}: channel=${cache.channelId}, role=${roleId}`);
			await interaction.reply({
				content: `${client.getEmoji('tick')} Verification setup completed!`,
				components: [],
				ephemeral: true
			});
		}
	}
};
