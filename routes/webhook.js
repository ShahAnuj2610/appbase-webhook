var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.query);
    res.send('awesome this works')
});

module.exports = router;
