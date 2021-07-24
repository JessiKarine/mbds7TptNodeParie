const express = require('express');
const router = express.Router();

const matchController = require('../controllers/match');

router.post('/', matchController.createMatch);
router.get('/getDerniersMatchs', matchController.getDerniersMatchs);
router.get('/getMatch', matchController.getMatch);
router.get('/getSponsor', matchController.getSponsor);

module.exports = router;
