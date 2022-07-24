const FollowModel = require('../models/follow')
const UserModel = require('../models/user')
const LikeModel = require('../models/like')
const PostModel = require('../models/post')
const CommentModel = require('../models/comment')
const RequestModel = require('../models/request')

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

	try {
		// Check if they have followed each other already
		const hasAlreadyFollowed = await FollowModel.findOne({
			$and: [{ follower: req.authenticatedUser._id }, { followed: userId }],
		})

		if (hasAlreadyFollowed) {
			// Then Unfollow Him
			const unfollow = await FollowModel.findByIdAndDelete(
				hasAlreadyFollowed._id,
			)

			if (!unfollow) {
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
			// Check if the user is PV
			// If Yes send them request
			// If not continue
			const isRequestedIsPv = await UserModel.findById(userId)

			if (!isRequestedIsPv) {
				return errorMessage(res, 'User Not Found')
			}

			if (isRequestedIsPv.isPrivate) {
				const hasAlreadyRequested = await RequestModel.findOne({
					$and: [
						{ userId: req.authenticatedUser._id },
						{ requestedUserId: userId },
					],
				})

				if (hasAlreadyRequested) {
					// The User has already requested to follow
					return successMessage(
						res,
						'You Have Already Requested To Follow',
						hasAlreadyRequested,
					)
				} else {
					// User has not requested to follow so make request
					// Make follow request here
					const followRequest = await RequestModel.create({
						userId: req.authenticatedUser._id,
						requestedUserId: userId,
					})

					if (!followRequest) {
						return errorMessage(res)
					} else {
						return successMessage(
							res,
							'Requested To Follow Successfully',
							followRequest,
						)
					}
				}
			} else {
				// The Account is not private so be cool do what ever you want
				// Follow Him
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

	// // Check if user has permission to like this post
	// try {
	// 	await postPermission(req, res, postId)
	// } catch (err) {
	// 	return errorMessage(res, 'No Permission')
	// }

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
				successMessage(res, 'Disliked Successfully')
			} else {
				errorMessage(res)
			}
		}
	} catch (err) {
		errorMessage(res)
	}
}

const commentController = async (req, res) => {
	const { comment, postId } = req.body

	if (!comment || !postId) {
		return errorMessage(res, 'postId or comment Required')
	}

	// // Check if user has permission to like this post
	// try {
	// 	await postPermission(req, res, postId)
	// } catch (err) {
	// 	return errorMessage(res, 'No Permission')
	// }

	try {
		const createComment = await CommentModel.create({
			postId,
			comment,
			userId: req.authenticatedUser._id,
		})

		if (!createComment) {
			return errorMessage(res)
		} else {
			successMessage(res, undefined, createComment)
		}
	} catch (err) {
		console.log(err)
		errorMessage(res)
	}
}

const deleteCommentController = async (req, res) => {
	const { postId } = req.body
	const commentId = req.params.id

	if (!postId || !commentId) {
		return errorMessage(res, 'postId Or commentId Required')
	}

	// // Check if user has permission to like this post
	// try {
	// 	await postPermission(req, res, postId)
	// } catch (err) {
	// 	return errorMessage(res, 'No Permission')
	// }

	try {
		const comment = await CommentModel.findByIdAndDelete(commentId)

		if (comment) {
			successMessage(res, 'Comment Deleted Successfully', comment)
		} else {
			errorMessage(res, 'Comment Not Found')
		}
	} catch (err) {
		errorMessage(res)
	}
}

const requestController = async (req, res) => {
	const { status, userId } = req.body

	if (!status || !userId) {
		return errorMessage(res, 'userId or status Are Required')
	}

	if (status === 'accept') {
		// Accept the request
		try {
			const request = await RequestModel.findOne({
				$and: [{ userId }, { requestedUserId: req.authenticatedUser._id }],
			})

			if (!request) {
				return errorMessage(res, 'No Request Has Been Found')
			}

			// No duplicate follow
			const duplicateFollow = await FollowModel.findOne({
				$and: [{ follower: userId }, { followed: req.authenticatedUser._id }],
			})

			if (!duplicateFollow) {
				// Add him to you followers
				const follow = await FollowModel.create({
					follower: userId,
					followed: req.authenticatedUser._id,
				})

				if (!follow) {
					return errorMessage(res)
				}

				// Delete Request
				const deleteReq = await RequestModel.findByIdAndDelete(request._id)

				if (!deleteReq) {
					return errorMessage(res)
				}

				return successMessage(res, 'Request Accepted Successfully')
			} else {
				// Already Users are in the follows collection
				return successMessage(res, 'Request Accepted Successfully')
			}
		} catch (err) {
			return errorMessage(res)
		}
	} else if (status === 'decline') {
		// Decline the request
	} else {
		return errorMessage(res, 'status Data Is Not Valid')
	}
}

module.exports = {
	followController,
	userInfoController,
	getFollowersController,
	getFollowingsController,
	likeController,
	commentController,
	deleteCommentController,
	requestController,
}
