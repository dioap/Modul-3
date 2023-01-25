const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { verifyToken } = require('../middlewares/auth');
router.post('/v1', authController.register);
router.post('/v2', authController.login);
router.post('/v3', verifyToken, authController.editPassword);

module.exports = router;
