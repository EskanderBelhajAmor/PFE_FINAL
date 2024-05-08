const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  emetteurId: { type: String, required: true }, // Identifiant de l'émetteur (recruteur ou candidat)
  recepteurId: { type: String, required: true }, // Identifiant du récepteur (recruteur ou candidat)
  idOffre: { type: String, required: true }, // Identifiant de l'offre associée à la discussion
  message: { type: String, required: true }, // Contenu du message
  date: { type: Date, default: Date.now }, // Date d'envoi du message
  nomEmetteur: { type: String, required: true }, // Nom de l'émetteur
  nomRecepteur: { type: String, required: true }, // Nom du récepteur
  vueOuNon: { type: Boolean, default: false } // Indique si le message a été vu ou non par le récepteur
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
