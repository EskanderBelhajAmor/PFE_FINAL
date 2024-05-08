const mongoose = require ('mongoose');

const User = mongoose.model('User' , {

nom: {

    type: String
},


prenom: {

    type: String
},

email: {

    type: String,
    unique: true
},

cin: {

    type: String,
    unique: true
},

username: {

    type: String
    
},

password: {

    type: String
},

role: {

    type: String
},


specialite: {

    type: String
},

isActive: {
type: Boolean,
default:false,
},

activationCode :{
    type : String
},

image: {

    type: String
}



}


)



module.exports = User;