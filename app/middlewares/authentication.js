const UserModel = require('../models/user')
const mongoose = require('mongoose')
const { decodeToken } = require('../utils/token')

module.exports = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).send({
			status: 'failed',
			message: 'Unauthorized',
		})
	}

	const authorizationHeaderParse = req.headers.authorization.split(' ')

	if (authorizationHeaderParse.length < 2) {
		return res.status(401).send({
			status: 'failed',
			message: 'Unauthorized',
		})
	}

	const token = authorizationHeaderParse[1]
	const userId = decodeToken(token)

	UserModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
		.select('-password')
		.then((user) => {
			if (!user) {
				return res.status(400).send({
					message: 'Something went wrong!',
				})
			}

			req.authenticatedUser = user

			next()
		})
}
