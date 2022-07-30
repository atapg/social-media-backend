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
	getOtherUsersPostController,
	getOtherUsersPostByIdController,
	getRequestsController,
} = require('../controllers/x-user')

const authMiddleware = require('../middlewares/authentication')
const pvMiddleware = require('../middlewares/pv')

router.use(authMiddleware)

// Follow / Unfollow
router.post('/follow', followController)

// Accept or Decline a Request
router.post('/requests', authMiddleware, requestController)

// Get list of requests
router.get('/requests', authMiddleware, getRequestsController)

// Like / Dislike
router.post('/like', authMiddleware, pvMiddleware, likeController)

// Comment
router.post('/comment', authMiddleware, pvMiddleware, createCommentController)
router.delete(
	'/comment/:id',
	authMiddleware,
	pvMiddleware,
	deleteCommentController,
)

// Get followers and followings
router.get('/followers', getFollowersController)
router.get('/followings', getFollowingsController)

// Get user info (yourself)
router.get('/', getYourOwnInfoController)

// Get user info - like prof
router.get('/:id', authMiddleware, getUserInfoController)

// Get Other Users Posts
router.post('/posts', authMiddleware, pvMiddleware, getOtherUsersPostController)
router.post(
	'/post/:id',
	authMiddleware,
	pvMiddleware,
	getOtherUsersPostByIdController,
)

module.exports = router
