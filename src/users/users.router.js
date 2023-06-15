const router = require('express').Router();

const usersController = require('./users.controller');

router.post('/', usersController.create);

router.post('/login', usersController.login);

router.get('/profile', usersController.profile)

router.post('/logout', usersController.logout)

module.exports = router;