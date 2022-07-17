const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jishnu:wfO5EmnoeQguIugG@cluster1.e131p.mongodb.net/library_db?retryWrites=true&w=majority')
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