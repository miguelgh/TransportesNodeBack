var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/login');// redirecciona el index al login, si la persona pone la / lo lleva al login
});

module.exports = router;
