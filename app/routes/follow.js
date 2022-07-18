const router = require('express').Router()

const { followController } = require('../controllers/follow')

const authMiddleware = require('../middlewares/authentication')

router.use(authMiddleware)

router.post('/follow', followController)

module.exports = router
