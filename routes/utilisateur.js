const express = require('express');
const router = express.Router();

const utilisateurController = require('../controllers/utilisateur');


router.post('/', utilisateurController.createUtilisateur);
router.post('/login', utilisateurController.getOneUtilisateurByLoginAndPassword);
router.get('/', utilisateurController.getAllUtilisateur);
router.get('/login/:login', utilisateurController.getUtilisateurByUserName);
router.delete('/:id', utilisateurController.deleteUtilisateur);
router.get('/:idUser', utilisateurController.getUtilisateurByIdUser);
router.put('/:idUser', utilisateurController.updateUtilisateurByIdUser);


module.exports = router;
