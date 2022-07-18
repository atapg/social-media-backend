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
		} else {
			data.title = null
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
		errorMessage(res)
	}
}

//TODO Set private functionality after setting follow functionality
const getPostByIdController = async (req, res) => {
	const id = req.params.id

	try {
		const post = await PostModel.findById(id)

		if (post) {
			successMessage(res, undefined, post)
		}
	} catch (err) {
		errorMessage(res)
	}
}

const deletePostController = async (req, res) => {
	const id = req.params.id

	try {
		const post = await PostModel.findByIdAndDelete(id)

		if (post) {
			successMessage(res, 'Post Deleted Successfully', post)
		} else {
			errorMessage(res, 'Post Not Found')
		}
	} catch (err) {
		errorMessage(res)
	}
}

const editPostController = async (req, res) => {
	const id = req.params.id

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
		} else {
			data.title = null
		}

		await PostModel.findByIdAndUpdate(id, data)

		const post = await PostModel.findById(id)

		if (post) {
			successMessage(res, 'Post Updated Successfully', post)
		} else {
			errorMessage(res, 'Post Not Found')
		}
	} catch (err) {
		errorMessage(res)
	}
}

module.exports = {
	editPostController,
	deletePostController,
	getPostByIdController,
	getPostsController,
	createPostController,
}
