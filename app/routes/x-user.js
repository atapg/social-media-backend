const router = require('express').Router()

const {
	followController,
	userInfoController,
	getFollowersController,
	getFollowingsController,
	likeController,
	commentController,
	deleteCommentController,
	requestController,
} = require('../controllers/x-user')

const authMiddleware = require('../middlewares/authentication')
const pvMiddleware = require('../middlewares/pv')

router.use(authMiddleware)

// Follow / Unfollow
router.post('/follow', followController)

// Request
router.post('/request', authMiddleware, requestController)

// Like / Dislike
router.post('/like', pvMiddleware, likeController)

// Comment
router.post('/comment', pvMiddleware, commentController)
router.delete('/comment/:id', pvMiddleware, deleteCommentController)

// Get followers and followings
router.get('/followers', getFollowersController)
router.get('/followings', getFollowingsController)

// Get user info
router.get('/', userInfoController)

module.exports = router
