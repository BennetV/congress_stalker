var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var favicon = require('serve-favicon');

app.use(favicon(__dirname +'/public/images/film.svg'));
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(express.static('public'));


app.use(require('./controllers/bills'));//use the bills.js controller

app.use(require('./controllers/legislators'));//use the legislators.js controller

app.listen(3000, function(){
	console.log('listening on port 3000!')
});

//add models folder with legislator and one with bills