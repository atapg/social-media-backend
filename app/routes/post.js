const router = require('express').Router()

const authMiddleware = require('../middlewares/authentication')

const {
	createPostController,
	deletePostController,
	editPostController,
	getPostsController,
	getPostByIdController,
} = require('../controllers/post')

router.use(authMiddleware)

router.route('/').post(createPostController).get(getPostsController)

router
	.route('/:id')
	.get(getPostByIdController)
	.delete(deletePostController)
	.put(editPostController)

module.exports = router
