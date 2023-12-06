const express = require('express');
const router = express.Router();
const controller = require('../controllers/chapterController'); 

router.get('/extract', controller.ExtractChaptre);
router.get('/chapters', controller.GetAllChapters);

module.exports = router;
