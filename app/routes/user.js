const router = require('express').Router()

const { registerController } = require('../controllers/user')

router.post('/register', registerController)

module.exports = router
