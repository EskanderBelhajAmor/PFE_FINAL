const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  idemployeur: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
 
  phrasemotivation: {
    type: String,
    required: true
  },
  idcandidat: {
    type: String,
    required: true
  },
  idoffre: {
    type: String,
    required: true
  },
  descposte: {
    type: String,
    required: true
  },
  etat: {
    type: String,
    enum: ['demande', 'preselectionné', 'accepté', 'refusé'],
    default: 'demande'
  },
  CVpdf: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Candidature', candidatureSchema);
