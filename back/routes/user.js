const express = require ('express');
const router = express.Router();
const User = require ('../models/user');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail } = require('../nodemailer');

filename = '';
const mystorage = multer.diskStorage({

    destination: './uploads',
    filename: (req, file , redirect)=> {

        let date = Date.now();
        let fl= date+ '.'+file.mimetype.split('/')[1];
        redirect(null, fl);
        filename = fl;

    }
})

const upload = multer ({storage: mystorage})





router.post('/register', upload.any('image'), (req,res)=>

{
const charac = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
let activationCode = "";
for ( let i=0 ; i<25 ; i++)  {
    activationCode+=charac[Math.floor(Math.random()* charac.length)];
}



data = req.body;
user = new User(data);
user.image= filename;

salt = bcrypt.genSaltSync(10);
user.password = bcrypt.hashSync(data.password , salt);
user.activationCode = activationCode ;


user.save()
.then(

    (saveUser)=>{
        filename="";
        res.status(200).send(saveUser);
        sendConfirmationEmail(user.email , user.activationCode);
    }
)
.catch(
    err=>{
        res.send(err)
    }
)
}
)



router.post('/login', (req,res)=>{
let data = req.body;
User.findOne({email : data.email})
.then(
(user)=>{
let valid = false;
 valid =bcrypt.compareSync(data.password, user.password);
if(!valid){
    res.send('email or password invalid');

}
else if(!user.isActive){
    res.send('email non vérifier');
}
else {
let payload = {
_id: user._id,
email : user.email,
roles : user.role,
fullname: user.cin + ' ' + user.prenom
}

let token =jwt.sign(payload, '123456789');
res.send({mytoken: token})

}

}

)
.catch(

err=>{

    res.send(err);
}

)    
}
)





router.get('/all', (req,res)=>

{
    User.find({})
    .then (
(users)=> {

    res.status(200).send(users);
} )
.catch(

    (err)=>{
        res.status(400).send(err);
    }
    )  
}
)




router.get('/getbyid/:id', (req,res)=>

{
let id =req.params.id
User.findOne({_id: id})
 .then (
(users)=>{
    res.status(200).send(users);
}
)
 
 .catch(
(err)=>{
    res.status(400).send(err);
}

 )
}
)

router.post('/verifyuser/:activationcode', (req, res) => {
    User.findOne({ activationCode: req.params.activationcode })
        .then(user => {
            if (user) {
                user.isActive = true;
                return user.save();
            } else {
                throw new Error("Utilisateur non trouvé");
            }
        })
        .then(savedUser => {
            res.send({
                message: "Le compte a été activé avec succès."
            });
        })
        .catch(error => {
            console.error("Erreur lors de l'activation du compte :", error);
            res.status(500).send({
                message: "Une erreur s'est produite lors de l'activation du compte."
            });
        });
});



module.exports = router;