const { resolveSoa } = require('dns')
const mongoose = require('mongoose')

const todoSchema =  mongoose.Schema({
    name: {
        type:String,
        require:[true,'Todo must have name']
    },
    isDone: {
        type: String,
        default:false
    },
    issueAt: {
        type: Date,
        default:Date.now()
    }
})

const Todo = mongoose.model('Todo',todoSchema)

exports.getAll = async (req,res) => {
    try{
        const todo = await Todo.find()
        res.status(200).json({
            message:'Success',
            todo
        })
    }catch(err){
        res.status(404).json({
            message: 'Failed',
            err: err.message
        })
    }
}

exports.create = async (req,res) =>{
    try {
        console.log(req.body.name)
        const newTodo = await Todo.create({
            name: req.body.name
        })
        res.status(201).json({
            message:'Success',
            newTodo
        }) 
    } catch (error) {
        res.status(404).json({
            message:'Failed',
            err: err.message
        })
    }
}

exports.update = async (req,res) =>{
    try {
        const id = req.body.id
        const updateTodo = await Todo.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json({
            message:'Success',
            updateTodo
        }) 
    } catch (error) {
        res.status(404).json({
            message:'Failed',
            err: err.message
        })
    }
}

exports.delete = async (req,res)=>{
    try {
        const id = req.body.id
        console.log(id)
        const delTodo = await Todo.findByIdAndDelete(id)
        res.status(200).json({
            message:"Success",
            delTodo
        })
    } catch (error) {
        res.status(404).json({
            message:'Failed',
            err: err.message
        })
    }
}