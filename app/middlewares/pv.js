const UserModel = require('../models/user')
const FollowModel = require('../models/follow')
const PostModel = require('../models/post')
const { errorMessage } = require('../utils/response')

module.exports = async (req, res, next) => {
	const { postId, userId } = req.body

	if (postId) {
		const post = await PostModel.findById(postId)

		if (!post) {
			return errorMessage(res, 'Not Found')
		}

		const isPv = await isPrivateAccount(post.creator)

		if (isPv) {
			const areFollowing = await areFollowers(
				post.creator,
				req.authenticatedUser._id,
			)

			if (!areFollowing) {
				return errorMessage(res, "The User's Account Is Private")
			}
		}

		next()
	} else if (userId) {
		// this is for users follow req

		next()
	} else {
		return errorMessage(res, 'Access Denied')
	}
}

const areFollowers = async (followedId, followerId) => {
	return FollowModel.findOne({
		$and: [
			{
				followed: followedId,
			},
			{
				follower: followerId,
			},
		],
	})
}

const isPrivateAccount = async (id) => {
	const user = await UserModel.findById(id)

	if (!user) {
		return false
	} else return !!user.isPrivate
}
