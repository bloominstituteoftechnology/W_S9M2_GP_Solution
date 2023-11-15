const express = require('express')
const cors = require('cors')
const path = require('upath')
const fs = require('fs')
const https = require('https')

const PORT = process.env.PORT || 9009

const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  passphrase: 'abcd'
}

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist')))
app.use(cors())
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
app.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.path} does not exist`,
  })
})

const server = https.createServer(options, app)

server.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`)
})
