const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

// Points to function in controller and assigns URL
router.get('/', defaultController.view);

// Creates router object
module.exports = router;