const UserModel = require('../models/user')
const FollowModel = require('../models/follow')
const PostModel = require('../models/post')

const likePermission = async (req, res, postId) => {
	const post = await PostModel.findById(postId)

	if (!post) {
		throw new Error('Post not found')
	}

	const isPv = await isPrivateAccount(post.creator)

	if (isPv) {
		const areFollowing = await areFollowers(
			post.creator,
			req.authenticatedUser._id,
		)

		if (!areFollowing) {
			throw new Error('They are not followers')
		}
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

module.exports = { likePermission }
