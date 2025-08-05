const { Schema, model } = require('mongoose');

const configSchema = new Schema({
	guildId: String,
	verifyChannelId: String,
	verifyRoleId: String,
});

module.exports = model('Config', configSchema);
