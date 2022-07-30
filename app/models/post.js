const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema(
	{
		title: {
			type: String,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		likesCount: {
			type: Number,
			default: 0,
		},
		content: {
			type: String,
			required: true,
		},
		postType: {
			type: String,
			enum: ['image', 'video', 'text'],
			required: true,
		},
		lastComments: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'comment',
				},
			],
			maxlength: 3,
		},
		location: {
			type: String,
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('post', postSchema)
