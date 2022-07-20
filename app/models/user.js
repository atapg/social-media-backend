const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 8,
		},
		isPrivate: {
			type: Boolean,
			required: true,
			default: false,
		},
		profilePicture: {
			type: String,
			default: '',
		},
		followers: {
			type: Number,
			default: 0,
		},
		followings: {
			type: Number,
			default: 0,
		},
		bio: String,
		birthday: {
			type: Date,
			required: true,
		},
		posts: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
)

userSchema.pre('save', async function (next) {
	if (!this.isModified) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('user', userSchema)
