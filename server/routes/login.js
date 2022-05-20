const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Points to functions in controller and assigns URL
router.get('/', loginController.view);
router.post('/attempt', loginController.loginAttempt);

// Creates router object
module.exports = router;