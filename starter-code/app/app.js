var express = require('express')
var path = require('path')
var debug = require('debug')
var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var app = express()
var router = express.Router()

var moongoose = require('mongoose')
moongoose.connect('mongodb://localhost/animalshelter')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.listen(3000)
console.log('server started')

// ############ YOU CAN ADD YOUR CODE BELOW
var Animal = require('./models/animal')

app.get('/animals', function (req, res) {
  Animal.find({}, function (err, animals) {
    if (err) res.send('something wrong happened' + err)
    console.log(animals)
    res.render('animals/index', { animals: animals })
  })
})

app.get('/animals/new', function (req, res) {
  res.render('animals/new')
})

app.post('/animals', function (req, res) {
  Animal.create(req.body.animal, function (err, animal) {
    if (err) {
      res.send('something wrong happened' + err)
    } else {
      console.log('post new animal')
      res.redirect('/animals')
    }
  })
})

app.get('/animals/:id', function (req, res) {
  Animal.findById(req.params.id, function (err, data) {
    res.send(data)
  })
})

app.get('/animals/:id/adopt', function (req, res) {
  Animal.findByIdAndUpdate(req.params.id, { status: 'adopt' }, function (err, data) {
    if (err) res.send('something wrong happened' + err)

    console.log('change the status of ' + data.name + ' by the given id to adopt')
    res.redirect('/animals')
  })
})

app.get('/animals/:id/abandon', function (req, res) {
  Animal.findByIdAndUpdate(req.params.id, { status: 'orphan' }, function (err, data) {
    if (err) res.send('something wrong happened' + err)

    console.log('change the status of ' + data.name + ' by the given id to orphan')

    res.redirect('/animals')
  })
})
