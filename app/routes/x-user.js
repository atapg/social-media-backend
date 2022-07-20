const router = require('express').Router()

const {
	followController,
	userInfoController,
	getFollowersController,
	getFollowingsController,
	likeController,
	commentController,
	deleteCommentController,
} = require('../controllers/x-user')

const authMiddleware = require('../middlewares/authentication')

router.use(authMiddleware)

// Follow / Unfollow
router.post('/follow', followController)

//TODO Create PV middleware for like and comment
//
// Like / Dislike
router.post('/like', likeController)

// Comment
router.route('/comment').post(commentController).delete(deleteCommentController)

// Get followers and followings
router.get('/followers', getFollowersController)
router.get('/followings', getFollowingsController)

// Get user info
router.get('/', userInfoController)

module.exports = router
