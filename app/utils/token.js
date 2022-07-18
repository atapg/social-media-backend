const jwt = require('jsonwebtoken')

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
}

const decodeToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) return err
		else return decoded.id
	})
}

module.exports = {
	generateToken,
	decodeToken,
}
