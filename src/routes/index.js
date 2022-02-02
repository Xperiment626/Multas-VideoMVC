const express = require('express');
const router = express.Router();
const controller = require('../controller/prestamos-controller');

router.get('/', controller.getAllBorrowers);

router.post('/multas', controller.filtrarMultas);

router.get('/multas', (req, res) => {
    res.render('multas')
});

module.exports = router;