const router = require('express').Router()

const authMiddleware = require('../middlewares/authentication')

const {
	createPostController,
	deletePostController,
	editPostController,
	getPostsController,
	getPostByIdController,
} = require('../controllers/post')

router
	.route('/')
	.post(authMiddleware, createPostController)
	.get(getPostsController)
	.delete(authMiddleware, deletePostController)
	.put(authMiddleware, editPostController)

router.get('/:id', getPostByIdController)

module.exports = router
