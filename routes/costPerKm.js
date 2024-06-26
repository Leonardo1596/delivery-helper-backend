const express = require('express');
const router = express.Router();
const CostPerKmController = require('../controllers/CostPerKmController');

// router.post('/cost_per_km/create', CostPerKmController.createCostPerKm);
router.put('/cost_per_km/update/:userId/:costPerKmId', CostPerKmController.updateCostPerKm);
router.get('/get/costPerKm/:id', CostPerKmController.getCostPerKm);

module.exports = router;