const { registerUser, loginUser, verifySession } = require('../controllers/auth.controller');
const isUserLogedIn = require('../middlewares/auth.middleware');


const router = require('express').Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/verify',isUserLogedIn,verifySession);

module.exports = router;