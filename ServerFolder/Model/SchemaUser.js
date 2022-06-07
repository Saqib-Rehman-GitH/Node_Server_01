const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        lowercase:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const SchemaUser = mongoose.model('Users',UserModel);
module.exports = SchemaUser;