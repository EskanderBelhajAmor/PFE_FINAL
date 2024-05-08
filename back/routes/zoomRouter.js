const express = require('express');
const router = express.Router();
const axios = require('axios');
const ZoomMeeting = require('../models/zoomRouter');
const clientID = 'cqGueJ8dRdedXpkqNtahWA';
const clientSecret = '3K5yNsGuZfb6UvB6NISwXXuDS6SU8JZU';
const accountID = '9s4XewlOR9KNYZ2Y0b1zLQ';
const { sendentretien } = require('../nodemailer');
const { sendupdateentretien } = require('../nodemailer');
const { sendAnnulationEntretien } = require('../nodemailer');

const base64Credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

const tokenOptions = {
  url: 'https://zoom.us/oauth/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${base64Credentials}`
  },
  data: {
    grant_type: 'account_credentials',
    account_id: accountID
  }
};

// Route pour créer un nouvel entretien avec un lien de réunion généré
router.post('/addentretien', async (req, res) => {
  try {
    const { idemployeur, idcandidat, idoffre, dateentretien, heureentretien , titre , email } = req.body;

    // Obtenir un nouvel access token
    const tokenResponse = await axios(tokenOptions);
    const accessToken = tokenResponse.data.access_token;

    // Générer un nouveau lien de réunion
    const meetingResponse = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
      topic: 'My Meeting',
      type: 2,
      start_time: new Date().toISOString(),
      duration: 60,
      timezone: 'America/Los_Angeles',
      settings: {
        join_before_host: true
      }
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const meetingLink = meetingResponse.data.start_url;

    // Créer un nouvel entretien avec le lien de réunion généré
    const newMeeting = new ZoomMeeting({
      idemployeur,
      idcandidat,
      idoffre,
      dateentretien,
      heureentretien,
      email,
      titre,
      lienmeeting: meetingLink
    });

    const savedMeeting = await newMeeting.save();
    sendentretien(newMeeting.email , newMeeting.titre , newMeeting.lienmeeting , newMeeting.dateentretien , newMeeting.heureentretien  );
    res.status(201).json(savedMeeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du meeting Zoom' });
  }
});

// Get all Zoom meetings
router.get('/', async (req, res) => {
  try {
    const meetings = await ZoomMeeting.find();
    res.json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des meetings Zoom' });
  }
});

// Get a single Zoom meeting by ID
router.get('/:id', async (req, res) => {
  try {
    const meeting = await ZoomMeeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting non trouvé' });
    }
    res.json(meeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du meeting Zoom' });
  }
});

// Update a Zoom meeting by ID
router.put('/:id', async (req, res) => {
  try {
    const { idemployeur, idcandidat, idoffre, dateentretien, heureentretien, lienmeeting , titre , email } = req.body;

    const updatedMeeting = await ZoomMeeting.findByIdAndUpdate(req.params.id, {
      idemployeur,
      idcandidat,
      idoffre,
      dateentretien,
      heureentretien,
      titre,
      email,
      lienmeeting
    }, { new: true });

    if (!updatedMeeting) {
      return res.status(404).json({ message: 'Meeting non trouvé' });
    }
    sendupdateentretien(email, titre, lienmeeting, dateentretien, heureentretien);
    res.json(updatedMeeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du meeting Zoom' });
  }
});

// Delete a Zoom meeting by ID


router.delete('/:id', async (req, res) => {
  try {
    const deletedMeeting = await ZoomMeeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting non trouvé' });
    }

    // Envoyer l'email d'annulation
    sendAnnulationEntretien(deletedMeeting.email, deletedMeeting.titre, deletedMeeting.dateentretien, deletedMeeting.heureentretien);

    res.json({ message: 'Meeting supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du meeting Zoom' });
  }
});



// Get entretiens by employer ID
router.get('/getentretienbyemployeurid/:id', async (req, res) => {
  try {
    const idEmployeur = req.params.id;

    const entretiens = await ZoomMeeting.find({ idemployeur: idEmployeur });

    if (!entretiens.length) {
      return res.status(404).json({ message: 'Aucun entretien trouvé pour cet employeur' });
    }

    // Renvoyer uniquement les titres, les dates et les heures des entretiens
    const result = entretiens.map(entretien => ({
      titre: entretien.titre,
      dateentretien: entretien.dateentretien,
      heureentretien: entretien.heureentretien
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des entretiens pour cet employeur' });
  }
});



module.exports = router;