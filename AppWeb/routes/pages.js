const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/accueil', (req, res) => {
    res.render('accueil');
});
module.exports = router;