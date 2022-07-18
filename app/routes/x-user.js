const router = require('express').Router()

const {
	followController,
	userInfoController,
	getFollowersController,
	getFollowingsController,
} = require('../controllers/x-user')

const authMiddleware = require('../middlewares/authentication')

router.use(authMiddleware)

router.route('/follow').post(followController)
router.get('/followers', getFollowersController)
router.get('/followings', getFollowingsController)
router.get('/', userInfoController)

module.exports = router
