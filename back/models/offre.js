const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },


  specialite: {
    type: String,
    required: true
  },

  idemployeur: {
    type: String,
    required: true
  },
  desc_entreprise: {
    type: String,
    required: true
  },
  desc_poste: {
    type: String,
    required: true
  },

  nombreCandidature: {
    type: Number,
    default: 0 // Initialiser le nombre de candidatures à 0
  },
  
  qualification: {
    type: String,
    required: true
  },
  enligneouadist: {
    type: String,
    required: true,
    enum: ['en ligne', 'sur site' , 'hybride']
  },
  datecloture: {
    type: Date,
    required: true
  },
  isactive: {
    type: Boolean,
    default: true
  },
emplacement: {
    type: String,
    required: true
}
});


offreSchema.pre('save', function(next) {
  const currentDate = new Date();
  if (this.datecloture && this.datecloture <= currentDate) {
    this.isactive = false;
  } else {
    this.isactive = true;
  }
  next();
});


module.exports = mongoose.model('Offre', offreSchema);
