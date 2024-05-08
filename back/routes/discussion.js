const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');

// Endpoint pour récupérer toutes les discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des discussions' });
  }
});

// Endpoint pour créer une nouvelle discussion
router.post('/', async (req, res) => {
  try {
    const { emetteurId, recepteurId, idOffre, message, nomEmetteur, nomRecepteur } = req.body;
    const discussion = new Discussion({ emetteurId, recepteurId, idOffre, message, nomEmetteur, nomRecepteur });
    const savedDiscussion = await discussion.save();
    res.json(savedDiscussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
  }
});

// Endpoint pour mettre à jour une discussion
router.put('/:id', async (req, res) => {
  try {
    const { emetteurId, recepteurId, idOffre, message, nomEmetteur, nomRecepteur, vueOuNon } = req.body;
    const updatedDiscussion = await Discussion.findByIdAndUpdate(req.params.id, {
      emetteurId,
      recepteurId,
      idOffre,
      message,
      nomEmetteur,
      nomRecepteur,
      vueOuNon
    }, { new: true });
    res.json(updatedDiscussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la discussion' });
  }
});

// Endpoint pour supprimer une discussion
router.delete('/:id', async (req, res) => {
  try {
    const deletedDiscussion = await Discussion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Discussion supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la discussion' });
  }
});

// Endpoint pour récupérer les messages entre deux utilisateurs spécifiques
// Endpoint pour récupérer les messages entre deux utilisateurs spécifiques
router.get('/messages', async (req, res) => {
  try {
    const { id1, id2, idOffre } = req.query;
    const messages = await Discussion.find({
      $or: [
        { emetteurId: id1, recepteurId: id2, idOffre: idOffre }, // Recherche des messages envoyés par id1 à id2 pour idOffre donné
        { emetteurId: id2, recepteurId: id1, idOffre: idOffre }  // Recherche des messages envoyés par id2 à id1 pour idOffre donné
      ]
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages entre utilisateurs spécifiques' });
  }
});



module.exports = router;
