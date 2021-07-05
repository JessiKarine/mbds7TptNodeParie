const express = require('express');
const router = express.Router();

const resultatController = require('../controllers/resultat');


router.get('/getResultat', resultatController.getResultat);

module.exports = router;
