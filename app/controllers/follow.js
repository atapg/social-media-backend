const FollowModel = require('../models/follow')
const UserModel = require('../models/user')

const { errorMessage, successMessage } = require('../utils/response')

const followController = async (req, res) => {
	const { userId } = req.body

	if (!userId) {
		return errorMessage(res, 'userId Not Defined')
	}

	if (userId.toString() === req.authenticatedUser._id.toString()) {
		return errorMessage(res, 'You Cannot Follow Yourself')
	}

	//TODO Add private functionality later
	try {
		const hasAlreadyFollowed = await FollowModel.findOne({
			$and: [{ follower: req.authenticatedUser._id }, { followed: userId }],
		})

		if (hasAlreadyFollowed) {
			// Then Unfollow Him
			const unfollow = await FollowModel.findByIdAndDelete(
				hasAlreadyFollowed._id,
			)

			if (!unfollow) {
				console.log('here')
				return errorMessage(res)
			}

			const user = await UserModel.findByIdAndUpdate(
				req.authenticatedUser._id,
				{
					$inc: { followings: -1 },
				},
			)

			if (!user) {
				console.log('here1')
				return errorMessage(res)
			}

			const targetUser = await UserModel.findByIdAndUpdate(userId, {
				$inc: { followers: -1 },
			})

			if (!targetUser) {
				console.log('here2')
				return errorMessage(res)
			}

			successMessage(res, 'Unfollowed Successfully')
		} else {
			// Else Follow Him
			const follow = await FollowModel.create({
				follower: req.authenticatedUser._id,
				followed: userId,
			})

			if (!follow) {
				return errorMessage(res, 'Invalid Credentials')
			}

			const user = await UserModel.findByIdAndUpdate(
				req.authenticatedUser._id,
				{
					$inc: { followings: 1 },
				},
			)

			if (!user) {
				return errorMessage(res)
			}

			const targetUser = await UserModel.findByIdAndUpdate(userId, {
				$inc: { followers: 1 },
			})

			if (!targetUser) {
				return errorMessage(res)
			}

			successMessage(res, 'Followed Successfully')
		}
	} catch (err) {
		errorMessage(res)
	}
}

module.exports = {
	followController,
}
