const express = require('express');
const router = express.Router();

const matchController = require('../controllers/match');


router.get('/getDerniersMatchs', matchController.getDerniersMatchs);
router.get('/getMatch', matchController.getMatch);

module.exports = router;
