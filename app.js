const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7005
const todoRoute = require('./routes/todoRoute')
const DB= 'mongodb://localhost:27017/todo'
const app = express()
mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(()=>{
        console.log('DB connect successfully')
    })
    .catch(error => handleError(error));
app.use(express.json())
app.use(express.static(`${__dirname}/view/`))
app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/view/index.html`)
})
app.use('/api/todos',todoRoute)
app.listen(PORT,()=>{
    console.log(`Server run on port ${PORT}`)
})