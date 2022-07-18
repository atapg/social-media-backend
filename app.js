// Env variables
require('dotenv').config()

// Imports
const app = require('express')()
const colors = require('colors') // Do not remove
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8585

// Settings
app.use(bodyParser.json())

// Middlewares

// Routes
app.use('/api/user', require('./app/routes/user'))

// Connect to mongoDB
require('./app/config/mongodb')

app.get('/', (req, res) => {
	res.send('hello')
})

// Server
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`.blue)
})
