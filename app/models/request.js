const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		requestedUserId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('request', requestSchema)
