const { Router } = require('express');
const route = Router();
route.use('/auth', require('./auth'))
route.use('/user', require('./user'))
route.use('/post', require('./post'))
route.use('/reaction', require('./reaction'))
module.exports = route;