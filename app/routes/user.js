const router = require('express').Router()

const {
	registerController,
	authenticateController,
	userInfoController,
} = require('../controllers/user')

const authMiddleware = require('../middlewares/authentication')

router.get('/info', authMiddleware, userInfoController)
router.post('/register', registerController)
router.post('/authenticate', authenticateController)

module.exports = router
