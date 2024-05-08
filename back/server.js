const express = require('express');
const userApi = require('./routes/user');
const cvApi = require('./routes/cv'); // Importer les routes CV
const offreApi = require('./routes/offre'); // Importer les routes Offre
const candidatureApi = require('./routes/candidature'); // Importer les routes Candidature
const discussionApi = require('./routes/discussion'); // Importer les routes Discussion
const testiqApi = require('./routes/testiq'); // Importer les routes Test IQ
const cors = require('cors');
require('./config/connect');
const zoomRouter = require("./routes/zoomRouter")
const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userApi);
app.use('/cv', cvApi); // Utiliser les routes CV
app.use('/offre', offreApi); // Utiliser les routes Offre
app.use('/candidature', candidatureApi); // Utiliser les routes Candidature
app.use('/discussion', discussionApi); // Utiliser les routes Discussion
app.use('/testiq', testiqApi); // Utiliser les routes Test IQ
app.use('/getimage', express.static('./uploads')); // Servir les fichiers statiques depuis le dossier uploads
app.use("/zoomapi", zoomRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
});
