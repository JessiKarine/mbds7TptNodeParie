const express = require('express');
const router = express.Router();

const pariController = require('../controllers/pari');

router.post('/', pariController.createPari);

module.exports = router;