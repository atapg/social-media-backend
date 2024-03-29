const mongoose = require('mongoose')

const Schema = mongoose.Schema

const followSchema = new Schema(
	{
		follower: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		followed: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('follow', followSchema)
