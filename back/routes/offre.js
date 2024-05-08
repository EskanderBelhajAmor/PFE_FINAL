const express = require('express');
const router = express.Router();
const Offre = require('../models/offre');

// GET - Récupérer toutes les offres d'emploi
router.get('/getalloffres', async (req, res) => {
    try {
        const offres = await Offre.find({ isactive: true });
        res.json(offres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - Créer une nouvelle offre d'emploi
router.post('/addoffre', async (req, res) => {
    const offre = new Offre(req.body);
    try {
        const newOffre = await offre.save();
        res.status(201).json(newOffre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET - Récupérer une offre d'emploi par son ID

router.get('/getoffrebyid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const offre = await Offre.findById(id);
        if (offre && offre.isactive) {
            res.status(200).json(offre);
        } else {
            res.status(404).json({ message: 'Offre non trouvée ou inactive' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


// PUT - Mettre à jour une offre d'emploi
router.put('/updateoffre/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedOffre = await Offre.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedOffre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE - Supprimer une offre d'emploi
router.delete('/deleteoffre/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Offre.findByIdAndDelete(id);
        res.json({ message: 'Offre supprimée avec succès' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




router.get('/getbyplace/:emplacement', async (req, res) => {
    const emplacement = req.params.emplacement;
    try {
        const offres = await Offre.find({ emplacement: emplacement, isactive: true });
        res.status(200).json(offres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/getbyspecialite/:specialite', async (req, res) => {
    const specialite = req.params.specialite;
    try {
        const offres = await Offre.find({ specialite: specialite, isactive: true });
        res.status(200).json(offres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// GET - Récupérer toutes les offres d'un employeur par son ID
router.get('/getbyidemployeur/:idemployeur', async (req, res) => {
    const idemployeur = req.params.idemployeur;
    try {
        const offres = await Offre.find({ idemployeur: idemployeur, isactive: true });
        res.status(200).json(offres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/getbyidemployeurifnotactive/:idemployeur', async (req, res) => {
    const idemployeur = req.params.idemployeur;
    try {
        const offres = await Offre.find({ idemployeur: idemployeur, isactive: false });
        res.status(200).json(offres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET - Rechercher les offres d'emploi par mots-clés
router.get('/search/:keywords', async (req, res) => {
    const keywords = req.params.keywords;
    try {
        // Construisez une expression régulière pour rechercher des correspondances partielles
        const regex = new RegExp(keywords, 'i');

        // Recherchez les offres d'emploi qui contiennent les mots-clés fournis
        const offres = await Offre.find({
            $or: [
                { titre: { $regex: regex } },
                { desc_entreprise: { $regex: regex } },
                { desc_poste: { $regex: regex } },
                { qualification: { $regex: regex } },
                { emplacement: { $regex: regex } }
            ]
        });

        res.status(200).json(offres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





router.patch('/increment/:id/increment-candidature', async (req, res) => {
    try {
      const offreId = req.params.id;
      // Récupérer l'offre par son ID
      const offre = await Offre.findById(offreId);
      if (!offre) {
        return res.status(404).json({ message: "Offre non trouvée" });
      }
      // Incrémenter le nombre de candidatures
      offre.nombreCandidature++;
      // Sauvegarder l'offre mise à jour
      await offre.save();
      return res.status(200).json({ message: "Nombre de candidatures incrémenté avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'incrémentation du nombre de candidatures :", error);
      return res.status(500).json({ message: "Erreur lors de l'incrémentation du nombre de candidatures" });
    }
  });



module.exports = router;
