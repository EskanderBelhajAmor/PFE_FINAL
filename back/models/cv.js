const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
    title: String,
    institution: String,
    start_date: Date,
    end_date: Date
});

const experienceSchema = new mongoose.Schema({
    title: String,
    description: String,
    start_date: Date,
    end_date: Date
});


const competenceSchema = new mongoose.Schema({
    title: String,

});

const certificationSchema = new mongoose.Schema({
    title: String,

});

const langueSchema = new mongoose.Schema({
    title: String,

});

const qualiteSchema = new mongoose.Schema({
    title: String,

});

const cvSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    profile: String,
    description : String,
    iduser: String,
    Cin: String,
    telephone: String,
    Email: String,
    formations: [formationSchema],
    experiences: [experienceSchema],
    competences: [competenceSchema],
    certifications: [certificationSchema],
    langues: [langueSchema],
    qualites: [qualiteSchema],
    // Ajoutez d'autres champs selon vos besoins
    image: String // Nom du fichier d'image
});

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
