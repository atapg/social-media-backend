const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'post',
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('comment', commentSchema)
