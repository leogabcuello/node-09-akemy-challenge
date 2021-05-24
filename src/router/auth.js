const { Router } = require('express');
const { login } = require('../controllers/auth');
const { postLoginReuestValidation } = require('../middlewares/auth');
 
const router = Router();

router.post('/login', postLoginReuestValidation, login); 

module.exports = router;