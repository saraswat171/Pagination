const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {type:String , require:true},
    email: { unique: true, type: String },
    designation: {type:String , require:true},
    salary: {type:Number , require:true }
   
})

module.exports = mongoose.model("users", UsersSchema)