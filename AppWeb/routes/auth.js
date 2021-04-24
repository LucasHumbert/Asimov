const express = require("express");

const router = express.Router();

router.post('/login', (req, res) => {
    res.render('index');
});

module.exports = router;