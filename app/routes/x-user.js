const router = require('express').Router()

const {
	followController,
	userInfoController,
	getFollowersController,
	getFollowingsController,
	likeController,
} = require('../controllers/x-user')

const authMiddleware = require('../middlewares/authentication')

router.use(authMiddleware)

router.post('/follow', followController)
router.post('/like', likeController)
router.get('/followers', getFollowersController)
router.get('/followings', getFollowingsController)
router.get('/', userInfoController)

module.exports = router
