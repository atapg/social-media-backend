const router = require('express').Router()

const {
	followController,
	getYourOwnInfoController,
	getFollowersController,
	getFollowingsController,
	likeController,
	createCommentController,
	deleteCommentController,
	requestController,
	getUserInfoController,
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
router.post('/comment', pvMiddleware, createCommentController)
router.delete('/comment/:id', pvMiddleware, deleteCommentController)

// Get followers and followings
router.get('/followers', getFollowersController)
router.get('/followings', getFollowingsController)

// Get user info (yourself)
router.get('/', getYourOwnInfoController)

// Get user info - like prof
router.get('/:id', authMiddleware, getUserInfoController)

module.exports = router
