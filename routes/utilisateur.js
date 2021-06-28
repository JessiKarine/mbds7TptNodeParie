const express = require('express');
const router = express.Router();

const utilisateurController = require('../controllers/utilisateur');


router.post('/', utilisateurController.createUtilisateur);
router.post('/login', utilisateurController.getOneUtilisateurByLoginAndPassword);
router.get('/', utilisateurController.getAllUtilisateur);
router.delete('/:id', utilisateurController.deleteUtilisateur);

module.exports = router;
