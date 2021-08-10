const express = require('express');
const router = express.Router();

const pariController = require('../controllers/pari');

router.get('/getParis', pariController.getParis);
router.post('/', pariController.createPari);
router.get('/', pariController.getAllParis);
router.get('/:id', pariController.getPariById);
router.get('/getPariById/:id', pariController.getPariByIdObject);
router.get('/idUser/:idUser', pariController.getParisByUserId);
router.delete('/:id',pariController.removePari);
router.put('/:id', pariController.updatePari);


module.exports = router;