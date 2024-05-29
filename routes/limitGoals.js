const express = require('express');
const router = express.Router();
const LimitGoalsController = require('../controllers/LimitGoalsController');

router.post('/create/limit_goal', LimitGoalsController.createGoalsLimit);
router.put('/goal/update/:userId/:goalId', LimitGoalsController.updateGoalsLimit);

module.exports = router;