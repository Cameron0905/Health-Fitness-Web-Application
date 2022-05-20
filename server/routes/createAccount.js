const express = require('express');
const router = express.Router();
const createAccountController = require('../controllers/createAccountController');

// Points to functions in controller and assigns URL
router.get('/', createAccountController.view);
router.post('/create', createAccountController.createAccount);

// Creates router object
module.exports = router;