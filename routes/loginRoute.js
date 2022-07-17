const express = require('express')
const router = express.Router()
const jwt=require('jsonwebtoken')





username='admin'
password='12345'


router.post('api/',(req,res)=>{
    let userData=req.body
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE")


    // try{

        if(username !==userData.username||password !== userData.password){
            res.status(401).send('invalid username or password')
        }else{

            let payload={subject:username+password}
            let token = jwt.sign(payload,'secretKey')
         res.status(200).send({token})   
        }
    })

    module.exports=router