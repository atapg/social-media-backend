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

router.post('/follow', followController)

//TODO Create PV middleware for like and comment
router.post('/like', likeController)
router.route('/comment').post(commentController).delete(deleteCommentController)

router.get('/followers', getFollowersController)
router.get('/followings', getFollowingsController)
router.get('/', userInfoController)

module.exports = router
