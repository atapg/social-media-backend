const router = require('express').Router()

const {
	registerController,
	authenticateController,
} = require('../controllers/user')

router.post('/register', registerController)
router.post('/authenticate', authenticateController)

module.exports = router
