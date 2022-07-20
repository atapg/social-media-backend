const FollowModel = require('../models/follow')
const UserModel = require('../models/user')
const LikeModel = require('../models/like')
const PostModel = require('../models/post')

const { errorMessage, successMessage } = require('../utils/response')

const userInfoController = async (req, res) => {
	return successMessage(res, null, req.authenticatedUser)
}

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

const getFollowersController = async (req, res) => {
	// TODO Add pagination too

	try {
		const users = await FollowModel.find({
			followed: req.authenticatedUser._id,
		}).populate('follower')

		successMessage(res, undefined, users)
	} catch (err) {
		errorMessage(res)
	}
}

const getFollowingsController = async (req, res) => {
	// TODO Add pagination too

	try {
		const users = await FollowModel.find({
			follower: req.authenticatedUser._id,
		}).populate('followed')

		successMessage(res, undefined, users)
	} catch (err) {
		errorMessage(res)
	}
}

const likeController = async (req, res) => {
	const { postId } = req.body

	if (!postId) {
		return errorMessage(res, 'postId Required')
	}

	try {
		// Check if user has already liked this post or not
		const like = await LikeModel.findOne({ postId })

		if (!like) {
			// User has not liked yet
			// So like it

			const likePost = await LikeModel.create({
				userId: req.authenticatedUser._id,
				postId,
			})

			const increasePostLikes = await PostModel.findByIdAndUpdate(postId, {
				$inc: { likesCount: 1 },
			})

			if (likePost && increasePostLikes) {
				successMessage(res, undefined, likePost)
			} else {
				errorMessage(res)
			}
		} else {
			// User has liked the post
			// Dislike it

			const dislikePost = await LikeModel.findOneAndDelete({
				postId,
			})

			const decreasePostLikes = await PostModel.findByIdAndUpdate(postId, {
				$inc: { likesCount: -1 },
			})

			if (dislikePost && decreasePostLikes) {
				successMessage(res)
			} else {
				errorMessage(res)
			}
		}
	} catch (err) {
		errorMessage(res)
	}
}

module.exports = {
	followController,
	userInfoController,
	getFollowersController,
	getFollowingsController,
	likeController,
}
