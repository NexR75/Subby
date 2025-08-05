const VerifiedUser = require('../models/VerifiedUser');
const { extractTextFromImage } = require('../utils/ocr');
const { EmbedBuilder } = require('discord.js');

const EMOJIS = {
	tick: '<a:bd_tick:1402179534215843851>',
	cross: '<a:bd_cross:1402179512401133618>',
	loading: '<a:bd_loading:1402179517476503673>',
	ping: '<:bd_ping:1402179524321480714>',
	uptime: '<:bd_time:1402179536627568720>',
	reply_1: '<:bd_reply_1:1402179529040199845>',
	reply_2: '<:bd_reply_2:1402179526913425472>'
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
	name: 'messageCreate',
	async execute(client, message) {
		if (message.author.bot) return;

		// Command handling
		if (message.content.startsWith(client.prefix)) {
			const args = message.content.slice(client.prefix.length).trim().split(/ +/);
			const commandName = args.shift().toLowerCase();
			const command = client.commands.get(commandName);
			if (command) {
				console.log(`[Command] ${message.author.tag} used '${commandName}'`);
				try {
					await command.execute(client, message, args, EMOJIS);
				} catch (err) {
					console.error(`${EMOJIS.cross} [Command Error]`, err);
					const embed = embedMsg({
						color: 0xED4245,
						description: `${EMOJIS.cross} Command error!`
					}, client);
					await message.reply({ embeds: [embed] });
				}
			}
		}

		// Screenshot submission (use env IDs)
		if (!client.verifyChannelId || !client.subscriberRoleId) return;
		if (message.channel.id !== client.verifyChannelId) return;
		if (!message.attachments.size) return;

		// Check if user already has the subscriber role
		if (message.member.roles.cache.has(client.subscriberRoleId)) {
			const embedAlready = embedMsg({
				color: 0x57F287,
				description: `${EMOJIS.tick} You are already verified!`
			}, client);
			await message.reply({ embeds: [embedAlready] });
			return;
		}

		const attachment = message.attachments.first();
		console.log(`[Verify] ${message.author.tag} submitted an image: ${attachment.url}`);

		try {
			const embedChecking = embedMsg({
				color: 0x5865F2,
				description: `${EMOJIS.loading} Checking your screenshot, please wait...`
			}, client);
			const checkingMsg = await message.reply({ embeds: [embedChecking] });

			const imageBuffer = await fetch(attachment.url).then(res => res.arrayBuffer()).then(buf => Buffer.from(buf));
			const text = await extractTextFromImage(imageBuffer);
			const ytChannel = process.env.YT_CHANNEL_NAME;
			console.log(`[OCR] Extracted text:`, text);

			let embedResult, dmEmbed;
			if (text.toLowerCase().includes('subscribed') && text.toLowerCase().includes(ytChannel.toLowerCase())) {
				await message.member.roles.add(client.subscriberRoleId).catch(e => {
					console.error(`${EMOJIS.cross} [Role Error]`, e);
				});
				await VerifiedUser.updateOne(
					{ guildId: message.guild.id, userId: message.author.id },
					{ $set: { username: message.author.tag, verifiedAt: new Date() } },
					{ upsert: true }
				);
				console.log(`[Verify] ${message.author.tag} verified and role given.`);
				embedResult = embedMsg({
					color: 0x57F287,
					description: `${EMOJIS.tick} You have been verified! Role has been given.`
				}, client);
				dmEmbed = embedMsg({
					color: 0x57F287,
					description: `${EMOJIS.tick} You have been verified in **${message.guild.name}**!`
				}, client);
			} else {
				console.log(`[Verify] ${message.author.tag} failed verification.`);
				embedResult = embedMsg({
					color: 0xED4245,
					description: `${EMOJIS.cross} Verification failed. Please try again.`
				}, client);
				dmEmbed = embedMsg({
					color: 0xED4245,
					description: `${EMOJIS.cross} Verification failed in **${message.guild.name}**. Please try again.`
				}, client);
			}

			await checkingMsg.edit({ embeds: [embedResult] });
			await message.author.send({ embeds: [dmEmbed] }).catch(() => {});
		} catch (err) {
			console.error(`${EMOJIS.cross} [Verification Error]`, err);
			const embed = embedMsg({
				color: 0xED4245,
				description: `${EMOJIS.cross} Error processing your screenshot.`
			}, client);
			await message.reply({ embeds: [embed] });
			const dmEmbed = embedMsg({
				color: 0xED4245,
				description: `${EMOJIS.cross} Error processing your screenshot in **${message.guild.name}**.`
			}, client);
			await message.author.send({ embeds: [dmEmbed] }).catch(() => {});
		}
	}
};

