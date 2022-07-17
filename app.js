const express=require('express')
const app=express()
// const bookRouter=require('./routes/bookRoute')
// const loginRouter=require('./routes/loginRoute')
const bookModel=require('./src/model/bookModel')
const mongoose=require('mongoose')

const bodyParser=require('body-parser')
const cors = require('cors')
const path = require('path')


app.use(express.static(`./dist/library`));



app.use(cors())
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
// app.use('/books',bookRouter)
// app.use('/login',loginRouter)


username='admin'
password='12345'


app.post('/api/login',(req,res)=>{
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

function verifyToken(req,res,next){

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized  Request')
    }
    let token=req.headers.authorization.split(' ')[1]

    if(token=='null'){
        return res.status(401).send('unauthorized 2 request')
    }

    let payload=jwt.verify(token,'secretKey')
    console.log(payload)

    if(!payload){
        return res.status(401).send('Unauthorized request')
    }

    req.Bcode=payload.subject
    next()
}

app.post('/api/books',verifyToken,async(req,res)=>{
   
console.log('body',req.body);
    try{
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE")

        const bookMod=new bookModel({
            Bcode:req.body.data.Bcode,
            Bname:req.body.data.Bname,
            Bauthor:req.body.data.Bauthor,
            Bgenere:req.body.data.Bgenere,
            Bimage:req.body.data.Bimage
        })
        await bookMod.save()

        res.json({

            success:1,
            message:'Book successfuly saved'

        })

    }
    catch(err){
        res.json({
            success:0,
            message:'error occuured while saving'+err
        })

    }
})


app.get('/api/books',async(req,res)=>{
   
    try{
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE")
        let allBook=await bookModel.find()
        res.json({
            success:1,
            message:'books listed succesfuly',
            item:allBook
        })
    }
    catch(err){
        res.json({
        success:0,
        message:'error occured while testing'+err
        })
    }
})

app.get('/api/books/:id',async(req,res)=>{
    let id=req.params.id

    let ValidId=mongoose.Types.ObjectId.isValid(id)
    if(ValidId){
        try{

            let singleBook=await bookModel.findById({_id:id})
            res.json({
                success:1,
                message:'single book listed',
                item:singleBook
            })


        }
        catch(err){
            res.json({
                            success:0,
                            message:'error occured while listing single Book'+err
                    })
        }

    }
    else{
        res.json({
            success:0,
            message:'invalid id'
        })

    }
})


app.put('/api/books/:id',async(req,res)=>{
    let id=req.params.id
    validId=mongoose.Types.ObjectId.isValid(id)
    if(validId){
        try{
            await bookModel.findByIdAndUpdate({_id:id},{
                $set:
            {
            Bcode:req.body.Bcode,
            Bname:req.body.Bname,
            Bauthor:req.body.Bauthor,
            Bgenere:req.body.Bgenere,
            Bimage:req.body.Bimage
            }
        })
        res.json({
            success:1,
            message:'Book updated successfuly'
        })
        }
        catch(err){
            res.json({
                success:0,
                message:'error occured while updating'+err
            })
    }
}
})


app.delete('/api/books/:id',async (req,res)=>{
    let id=req.params.id

    let validId=mongoose.Types.ObjectId.isValid(id)
    if (validId){
        try{
            await bookModel.deleteOne({_id:id})
            res.json({
                success:1,
                message:'Book deleted successsfully'
            })
        }
        catch(err){

            res.json({
                success:0,
                message:'error occured while deleting'+err
            })

        }
    }
})




app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/library/index.html'));
   });

app.listen(process.env.PORT || 5001,(req,res)=>{
    console.log('listenning to port 5001');
})