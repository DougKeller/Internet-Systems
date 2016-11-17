var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
  response.render('index', { title: 'Calendar.io' });
});

module.exports = router;
