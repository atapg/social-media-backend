const router = require('express').Router()

const {
	followController,
	userInfoController,
} = require('../controllers/x-user')

const authMiddleware = require('../middlewares/authentication')

router.use(authMiddleware)

router.post('/follow', followController)
router.get('/', userInfoController)

module.exports = router
