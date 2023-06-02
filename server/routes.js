const router = require('express').Router();
const authController = require('./controllers/authController');
    router.get('/', (req, res) => {
        res.send('Helloooooooo')
    })
    router.use('/auth', authController);

module.exports = router;