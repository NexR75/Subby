const fs = require('fs');

let emojiMap = {};

function loadEmojis(filepath) {
	try {
		const data = fs.readFileSync(filepath, 'utf8');
		emojiMap = JSON.parse(data);
		console.log('[EmojiLoader] Emojis loaded:', Object.keys(emojiMap));
		return emojiMap;
	} catch (e) {
		console.error('[EmojiLoader] Failed to load emojis:', e);
		return {};
	}
}

function getEmoji(key) {
	const emoji = emojiMap[key] || '';
	if (!emoji) {
		console.error(`[EmojiLoader] Emoji key not found: '${key}'`);
	}
	return emoji;
}

// Utility to reload and log all emojis
function reloadAndLogEmojis(filepath) {
	loadEmojis(filepath);
	console.log('[EmojiLoader] All emojis:');
	Object.entries(emojiMap).forEach(([k, v]) => {
		console.log(`  ${k}: ${v}`);
	});
}

module.exports = { loadEmojis, getEmoji, reloadAndLogEmojis };
