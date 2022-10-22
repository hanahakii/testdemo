var express = require('express')
var router = express.Router()

//set trang chủ (homepage)
router.get('/', (req, res) => {
  //render ra trang index ở trong thư mục views
  res.render('index')
})
router.get('/about', (req, res) => {
  res.render('about');
});


module.exports = router