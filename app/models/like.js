const mongoose = require('mongoose')

const Schema = mongoose.Schema

const likeSchema = new Schema(
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
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model('like', likeSchema)
