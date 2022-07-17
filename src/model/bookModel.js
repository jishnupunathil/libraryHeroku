const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
.then((res)=>{
    console.log('database connected successfuly')

}).catch((err)=>{
    console.log('error occured while connecting'+err);
})

const bookSchema = new mongoose.Schema({

    Bcode:String,
    Bname:String,
    Bauthor:String,
    Bgenere:String,
    Bimage:String
})

const bookModel=mongoose.model('book',bookSchema)

module.exports=bookModel
