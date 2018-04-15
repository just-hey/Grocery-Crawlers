const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8002
require('dotenv').config()

console.log('firing')

app.use(cors({ exposedHeaders: 'Auth' }))
app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())

const router = require('./routes/Crawlers')
app.use('/scrape', router)

app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`;
  res.status(status).json({ status, message });
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Error.  Sad server is sad.'
  res.status(status).json({ message })
})

app.listen(port, () => console.log(`On port: ${port}`))

module.exports = app
