require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed')
const {getBeers, randomBeer, styleSuggestion, getNotes, getEntries, addEntries } = require('./controller.js')

app.use(express.json())
app.use(cors())


app.post('/seed', seed)

app.get('/api/beers', getBeers)
app.get('/api/notes', getNotes)
app.get('/api/beers/random', randomBeer)
app.get('/api/beers/suggest/:id', styleSuggestion)

app.get('/api/entries', getEntries)
app.post('/api/entries', addEntries)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))