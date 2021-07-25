const express = require('express');
const router = express.Router();

const mvtJoueurController = require('../controllers/mvtJoueur');

router.post('/', mvtJoueurController.createMvtJoueur);
router.get('/idUser/:idUser', mvtJoueurController.getMvtJoueurByIdUser);
router.delete('/:id', mvtJoueurController.removeMvtJoueurById);
router.get('/', mvtJoueurController.getAllMvtJoueur);

module.exports = router;