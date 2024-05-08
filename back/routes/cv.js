const express = require('express');
const router = express.Router();
const CV = require('../models/cv');

// GET - Récupérer tous les CVs
router.get('/getallcv', async (req, res) => {
    try {
        const cvs = await CV.find();
        res.json(cvs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST - Créer un nouveau CV
router.post('/addcv', async (req, res) => {
    const cv = new CV(req.body);
    try {
        const newCV = await cv.save();
        res.status(201).json(newCV);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Autres routes pour les opérations CRUD sur les CVs
router.get('/getbyid/:id', (req, res) => {
    const id = req.params.id;
    CV.findById(id)
        .then(cv => {
            if (cv) {
                res.status(200).json(cv);
            } else {
                res.status(404).json({ message: 'CV non trouvé' });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});




router.get('/getbyiduser/:iduser', async (req, res) => {
    const iduser = req.params.iduser;
    try {
        const cvs = await CV.find({ iduser: iduser });
        res.status(200).json(cvs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/getidcvbyiduser/:iduser', async (req, res) => {
    const iduser = req.params.iduser;
    try {
        const cv = await CV.findOne({ iduser: iduser }, '_id');
        if (cv) {
            res.status(200).json(cv);
        } else {
            res.status(404).json({ message: 'CV non trouvé pour cet utilisateur' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





module.exports = router;
