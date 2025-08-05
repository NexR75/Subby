const { Schema, model } = require('mongoose');

const verifiedUserSchema = new Schema({
	guildId: String,
	userId: String,
	username: String,
	verifiedAt: Date,
});

module.exports = model('VerifiedUser', verifiedUserSchema);
