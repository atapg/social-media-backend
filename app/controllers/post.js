const PostModel = require('../models/post')
const postValidation = require('../validations/post')
const { errorMessage, successMessage } = require('../utils/response')

const createPostController = async (req, res) => {
	const error = postValidation(req.body)

	if (error) return errorMessage(res, error)

	try {
		const data = {
			content: req.body.content,
			postType: req.body.postType,
			creator: req.authenticatedUser._id,
		}

		if (req.body.title) {
			data.title = req.body.title
		}

		const post = await PostModel.create(data)

		if (post) {
			return successMessage(res, 'Post Created Successfully', post)
		}
	} catch (err) {
		errorMessage(res, 'Something Went Wrong')
	}
}

const getPostsController = async (req, res) => {
	try {
		const posts = await PostModel.find({ creator: req.authenticatedUser._id })

		successMessage(res, 'Successful', posts)
	} catch (err) {
		errorMessage(res, err)
	}
}

const getPostByIdController = async (req, res) => {}

const deletePostController = async (req, res) => {}

const editPostController = async (req, res) => {}

module.exports = {
	editPostController,
	deletePostController,
	getPostByIdController,
	getPostsController,
	createPostController,
}
