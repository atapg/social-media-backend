const router = require('express').Router()
const multer = require('multer')

const authMiddleware = require('../middlewares/authentication')
const { successMessage } = require('../utils/response')

router.use(authMiddleware)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './files')
	},
	filename: function (req, file, cb) {
		cb(null, ~~(Date.now() / 1000) + '_' + file.originalname)
	},
})

const filterFile = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg'
	) {
		cb(null, true)
	} else {
		cb(new Error('Not a valid image type!'), false)
	}
}

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 5 },
	// fileFilter: filterFile,
})

router.post('/', upload.array('files', 6), async (req, res) => {
	successMessage(res, 'Files Uploaded Successfully', req.files)
})

module.exports = router
