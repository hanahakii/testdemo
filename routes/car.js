const express = require('express')
const CarModel = require('../models/CarModel')
const router = express.Router()


router.get('/drop', (req, res) => {
    CarModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/car')
    })
})

//URL: localhost:3000/car
router.get('/', (req, res) => {
    CarModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/car
            res.render('car/index', { car: data })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    CarModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete car succeed !");
            //var message = "Delete car succeed !";
            //redirect về trang /car (URL không phải view)
            res.redirect("/car");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("car/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    
    CarModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add car succeed !')
            res.redirect("/car")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    CarModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/car)
            //gửi kèm dữ liệu của object car để load vào form edit
            //car (tên) , data (dữ liệu)
            res.render("car/update", { car: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var car = req.body;
    CarModel.findByIdAndUpdate(id, car, (err) => {
        if (!err) {
            console.log("Update car succeed !")
            res.redirect("/car")
        }
    })
})


router.get('/detail/:id', (req, res) => {
    CarModel.findById(req.params.id, (err, car) => {
        if (!err) {
            res.render('car/info', { car: car })
        }
    })
})

//search function
router.post('/search', (req, res) => {
    CarModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('car/index', { car: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    CarModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('car/index', { car: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    CarModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('car/index', { car: data })
            }
        })
})
module.exports = router