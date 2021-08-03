const express = require('express');
const router = express.Router();

const matchController = require('../controllers/match');

router.post('/', matchController.createMatch);
router.get('/', matchController.getAllMatchAVenir);
router.get('/getDerniersMatchs', matchController.getDerniersMatchs);
router.get('/getMatch', matchController.getMatch);
router.get('/getSponsor', matchController.getSponsor);
router.put('/:id', matchController.updateMatch);
router.delete('/:id', matchController.removeMatchById);
router.get('/:id', matchController.getOneMatchById);

module.exports = router;
