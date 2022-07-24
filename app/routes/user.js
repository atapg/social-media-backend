const router = require('express').Router()

const {
	registerController,
	authenticateController,
	getUserPublicInfo,
} = require('../controllers/user')

router.post('/register', registerController)
router.post('/authenticate', authenticateController)

router.get('/:id', getUserPublicInfo)

module.exports = router
