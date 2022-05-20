const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Points to functions in controller and assigns URL
router.get('/', userController.view);
router.post('/data', userController.inputData);

// Creates router object
module.exports = router;