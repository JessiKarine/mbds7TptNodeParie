const express = require('express');
const router = express.Router();

const localisationAgenceController = require('../controllers/localisationAgence');

router.post('/', localisationAgenceController.createLocalisationAgence);
router.post('/agence', localisationAgenceController.getOneLocalisationByAgence);
router.get('/', localisationAgenceController.getAllLocalisationAgence);
router.put('/:id',localisationAgenceController.updateOneAgence);
router.delete('/:id', localisationAgenceController.deleteLocalisationAgence);

module.exports = router;