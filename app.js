var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

//configure the app
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//routing in duedate-calculator.js
require(path.join(__dirname, './routes/duedate-calculator.js')).dueDateCalculator(app);

//create server
http.listen(app.get('port'), function() {
    console.log('duedate-calculator server listening on localhost:' + app.get('port'));
});