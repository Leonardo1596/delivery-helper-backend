const express = require('express');
const router = express.Router();
const PersonalExpenseController = require('../controllers/PersonalExpenseController');

router.post('/personal-expense/create', PersonalExpenseController.createPersonalExpense);
router.delete('/personal-expense/delete/:userId/:personalExpenseId', PersonalExpenseController.deletePersonalExpense);
router.get('/personal-expenses/:userId', PersonalExpenseController.getPersonalExpenseByUser);

module.exports = router;