const express = require('express');
const router = express.Router();

const resultatController = require('../controllers/resultat');
const resultatController2 = require('../controllers/resultatC');

router.get('/getResultat', resultatController.getResultat);
router.get('/getResultatParCategorie', resultatController.getResultatParCategorie);
router.post('/', resultatController2.createResultat);
router.put('/:id', resultatController2.updateResultatById);
router.delete('/:id', resultatController2.removeResultat);
module.exports = router;
