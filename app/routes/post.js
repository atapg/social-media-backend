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

router
	.route('/')
	.post(createPostController)
	.get(getPostsController)
	.delete(deletePostController)
	.put(editPostController)

router.get('/:id', getPostByIdController)

module.exports = router
