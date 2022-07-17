const express=require('express')
const app=express()
const bookRouter=require('./routes/bookRoute')
const loginRouter=require('./routes/loginRoute')
const bodyParser=require('body-parser')
const cors = require('cors')
const path = require('path')


app.use(express.static('./dist/library'));



app.use(cors())
app.use(bodyParser.json())
app.use('/books',bookRouter)
app.use('/login',loginRouter)





app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/library/index.html'));
   });

app.listen(process.env.PORT || 5001,(req,res)=>{
    console.log('listenning to port 5001');
})