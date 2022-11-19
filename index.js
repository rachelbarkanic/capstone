const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())

const {seed} = require('./seed.js')

app.post('/seed', seed)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))