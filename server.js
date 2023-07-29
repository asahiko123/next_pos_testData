const process = require("process")
const jsonServer = require('json-server')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 8000
const authUser = {
    id: '1',
    username: 'administrator',
    displayName: '管理者',
}

server.use(cookieParser())
server.use(express.json)

server.post('auth/signin',(req,res) =>{
    if(
        !(req.body['username'] === 'user' && req.body['password'] === 'password')
    ){
        return res.status(401).json({
            message: 'ユーザー名かパスワードが違います'
        });
    }

    res.cookie('token','dummy_token',{
        maxAge: 3600 * 1000,
        httpOnly: true, 
    });
    res.status(201).json(authUser)
})

server.get('mainBoard',(req,res) => {
    res.cookie('token','dammy_token',{
        maxAge: 3600 * 1000,
        httpOnly: true
    })

    res.status(201).json(router)
})


server.use(middlewares)
server.use(router)
server.listen(port, (err) => {
    if(err) {
        console.error(err)
        process.exit()
        return;
    }
    console.log('Start listening...')
    console.log('http://localhost:' + port)
})