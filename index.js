const express = require('express')
const app = express()
const cors = require('cors')
const baseRouter = require('./router.js')
const PORT = process.env.PORT || 5000
require('dotenv').config()
const mongodb = require('./config/mongoose');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res)=>{
    return res.send('Server is running')
})

app.use('/api', baseRouter)

app.listen(PORT, ()=>{
    console.log('Server is running on port: ', PORT)
})