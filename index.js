require('dotenv').config()

const express = require('express')

const cors = require('cors')

const cookpediaserver= express()
const router=require('./routes/router')


cookpediaserver.use(cors())
cookpediaserver.use(express.json())
cookpediaserver.use(router)
require('./config/connection')


const port=4000||process.env.PORT

cookpediaserver.listen(port,() => {
    console.log(`server listening on ${port}`);
    
})
cookpediaserver.get('/',(req,res) =>{
    res.status(200).send(`<h1 style="color:red">CookpediaServer is started and waiting for client request</h1>`)
})