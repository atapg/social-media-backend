// Env variables
require('dotenv').config()

// Imports
const app = require('express')()
const colors = require('colors') // Do not remove
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8585

// Settings
app.use(bodyParser.json())
// TODO add cors

// Middlewares

// Routes
app.use('/api/user', require('./app/routes/user'))
app.use('/api/post', require('./app/routes/post'))
app.use('/api/x-user', require('./app/routes/x-user'))
app.use('/api/files', require('./app/routes/file'))

// Connect to mongoDB
require('./app/config/mongodb')

app.get('/', (req, res) => {
	res.send('hello')
})

// Server
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`.blue)
})
