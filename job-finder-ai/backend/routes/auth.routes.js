// backend/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

// Debug
console.log('🔍 Auth controllers loaded:', { 
  register: typeof register, 
  login: typeof login, 
  getMe: typeof getMe 
});

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;