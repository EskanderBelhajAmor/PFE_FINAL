const express = require('express');
const router = express.Router();
const multer = require('multer');
const Candidature = require('../models/candidature');
const { sendPostule } = require('../nodemailer');
const { sendPreselection } = require('../nodemailer');
const { sendAccepte } = require('../nodemailer');
const { sendRefuse } = require('../nodemailer');
const axios = require('axios');

// Configuration de multer pour télécharger les fichiers PDF
const upload = multer({ dest: 'uploads/' });

// POST - Ajouter une candidature avec le téléchargement du fichier PDF
router.post('/ajoutercandidature', upload.single('CVpdf'), async (req, res) => {
    try {
        const { idemployeur, idcandidat, etat, idoffre, prenom ,nom, email, telephone, phrasemotivation, titre , descposte } = req.body;
        const CVpdf = req.file.path; // Chemin du fichier téléchargé

        const candidature = new Candidature({
            idemployeur,
            idcandidat,
            etat,
            CVpdf,
            idoffre,
            prenom,
            nom,
            email,
            telephone,
            phrasemotivation,
            titre,
            descposte
        });

        const savedCandidature = await candidature.save();
        res.status(201).json(savedCandidature);
        sendPostule(candidature.email , candidature.titre , candidature.prenom , candidature.idcandidat );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtenir une candidature par son ID
router.get('/getcandidaturebyid/:id', getCandidatureById, (req, res) => {
    res.json(res.candidature);
});

// Modifier l'état d'une candidature par son ID
router.patch('/updateetat/:id', getCandidatureById, async (req, res) => {
    if (req.body.etat != null) {
        res.candidature.etat = req.body.etat;
        
    }
    try {
        const updatedCandidature = await res.candidature.save();
        if (res.candidature.etat === 'preselectionné') {
            await sendPreselection(res.candidature.email, res.candidature.titre , res.candidature.prenom);
        } else if (res.candidature.etat === 'accepté') {
            await sendAccepte(res.candidature.email, res.candidature.titre , res.candidature.prenom);
        } else if (res.candidature.etat === 'refusé') {
            await sendRefuse(res.candidature.email, res.candidature.titre , res.candidature.prenom); // Appeler sendRefuse si l'état est "refusé"
        }
        res.json(updatedCandidature);
       
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtenir les candidatures d'un employeur par son ID
router.get('/employeur/:idemployeur', async (req, res) => {
    try {
        const candidatures = await Candidature.find({ idemployeur: req.params.idemployeur });
        res.json(candidatures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtenir les candidatures d'un candidat par son ID
router.get('/candidat/:idcandidat', async (req, res) => {
    try {
        const candidatures = await Candidature.find({ idcandidat: req.params.idcandidat });
        res.json(candidatures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/getall', async (req, res) => {
    try {
        const candidatures = await Candidature.find();
        res.json(candidatures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtenir les candidatures d'une offre par son ID
router.get('/offre/:idoffre', async (req, res) => {
    try {
        const candidatures = await Candidature.find({ idoffre: req.params.idoffre });
        res.json(candidatures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware pour obtenir une candidature par son ID
async function getCandidatureById(req, res, next) {
    let candidature;
    try {
        candidature = await Candidature.findById(req.params.id);
        if (candidature == null) {
            return res.status(404).json({ message: 'Candidature non trouvée' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.candidature = candidature;
    next();
}










router.post('/calculate_similarity', async (req, res) => {
    try {
        const { cv_id, offer_id } = req.body;

        // Faire une requête POST vers votre serveur Flask pour calculer la similarité
        const response = await axios.post('http://localhost:5000/calculate_similarity', {
            cv_id,
            offer_id
        });

        // Récupérer le résultat de similarité depuis la réponse Flask
        const similarityScore = response.data.match_percentage;

        // Retourner le résultat au frontend Angular
        res.json({ similarity_score: similarityScore });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors du calcul de la similarité' });
    }
});

module.exports = router;
