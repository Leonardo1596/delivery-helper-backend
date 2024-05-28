const express = require('express');
const router = express.Router();
const GoalsController = require('../controllers/GoalsController');

router.post('/create/goal', GoalsController.createGoal)

module.exports = router;