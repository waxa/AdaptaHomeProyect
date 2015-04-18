var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/getValue/', function (req, res) {
	var jobj;
  	request.get("http://pasarela.lab.inf.uva.es:8080/getValue/", function(errorCode, message, data){
  		console.log(JSON.stringify(data));
  		//console.log("message: ", message);
  		console.log("code", errorCode);
  		res.send(data)
  	});
});

app.post('/setValue/', function(req, res) {
	console.log("in: " + JSON.stringify(req.body));
	var jobj;
  	request.post({url: "http://pasarela.lab.inf.uva.es:8080/setValue/", body: req.body, json: true} , 
		function(errorCode, message, data){
  		console.log("request: ", JSON.stringify(data));
  		console.log(typeof data);
  		//console.log("message: ", message);
  		console.log("code", errorCode);

		//console.log("response: " + JSON.stringify(jobj));
  		res.send(data);
  	});

})



var server = app.listen(20062, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});

