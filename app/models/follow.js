const mongoose = require('mongoose')

const Schema = mongoose.Schema

const followSchema = new Schema(
	{
		follower: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		followed: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('follow', followSchema)
