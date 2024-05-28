const express = require('express');
const router = express.Router();
const EntrieController = require('../controllers/EntrieController');

router.post('/entry/create', EntrieController.createEntrie);
router.delete('/entry/delete/:userId/:entrieId', EntrieController.deleteEntrie);
router.put('/entry/update/:userId/:entrieId', EntrieController.updateEntrie);
router.get('/entries/:userId', EntrieController.getEntrieByUser);

module.exports = router;