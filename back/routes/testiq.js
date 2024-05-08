const express = require('express');
const router = express.Router();
const Testiq = require('../models/testiq');

// Ajouter un test IQ
router.post('/tests', async (req, res) => {
  try {
    const { idcandidat, taux } = req.body;
    const test = new Testiq({ idcandidat, taux });
    await test.save();
    res.status(201).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du test IQ' });
  }
});

// Obtenir le taux par ID du candidat
router.get('/taux/:idcandidat', async (req, res) => {
  try {
    const { idcandidat } = req.params;
    const test = await Testiq.findOne({ idcandidat });
    if (test) {
      res.json({ taux: test.taux });
    } else {
      res.status(404).json({ message: 'Aucun test IQ trouvé pour cet ID de candidat' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du taux du test IQ' });
  }
});

module.exports = router;
