const { createChat, getChats, getConversation } = require('../controllers/chat.controller');
const isUserLogedIn = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post('/add',isUserLogedIn,createChat)
router.get('/',isUserLogedIn,getChats)
router.get('/conversation/:id',isUserLogedIn,getConversation)

module.exports = router;