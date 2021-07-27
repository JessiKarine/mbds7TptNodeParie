const express = require('express');
const router = express.Router();

const resultatController = require('../controllers/resultat');


router.get('/getResultat', resultatController.getResultat);
router.get('/getResultatParCategorie', resultatController.getResultatParCategorie);

module.exports = router;
