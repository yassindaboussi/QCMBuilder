const express = require('express');
const router = express.Router();
const controller = require('../controllers/qcmController'); 

router.get('/extract', controller.ExtractQcm);
router.get('/GenerateQcm', controller.GenerateQcm);

module.exports = router;
