var express = require('express')
const SlideModel = require('../models/SlideModel')
var router = express.Router()


router.get('/drop', (req, res) => {
    SlideModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/slide')
    })
})

//URL: localhost:3000/slide
router.get('/', (req, res) => {
    SlideModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/slide
            res.render('slide/index', { slide: data })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    SlideModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete slide succeed !");
            //var message = "Delete slide succeed !";
            //redirect về trang /slide (URL không phải view)
            res.redirect("/slide");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("slide/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    
    SlideModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add slide succeed !')
            res.redirect("/slide")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    SlideModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/slide)
            //gửi kèm dữ liệu của object slide để load vào form edit
            //slide (tên) , data (dữ liệu)
            res.render("slide/update", { slide: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var slide = req.body;
    SlideModel.findByIdAndUpdate(id, slide, (err) => {
        if (!err) {
            console.log("Update slide succeed !")
            res.redirect("/slide")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    SlideModel.findById(req.params.id, (err, slide) => {
        if (!err) {
            res.render('slide/info', { slide: slide })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    SlideModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('slide/index', { slide: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    SlideModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('slide/index', { slide: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    SlideModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('slide/index', { slide: data })
            }
        })
})
module.exports = router