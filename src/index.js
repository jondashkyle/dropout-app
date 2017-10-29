var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')

var dropout = require('./plugins/dropout')
var scroll = require('./plugins/scroll')
var ui = require('./plugins/ui')

css('recsst/recsst.css')
css('./design.js')

var app = choo()

app.use(dropout())
app.use(scroll())
app.use(ui())

app.route('/', require('./views/main'))
app.route('/:page', require('./views/page'))

if (module.parent) module.exports = app
else app.mount('body')