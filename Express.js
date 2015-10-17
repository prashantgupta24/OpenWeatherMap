var express = require('express');
var needle = require('needle');
var app = express();
var temp;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  
  var data = {
  q      : req.query.city,
  units   : req.query.metric,
  APPID : <add APP ID before executing>
}

needle.request('get', "http://api.openweathermap.org/data/2.5/weather", data, function(error, response) {
	if (!error && response.statusCode == 200)
	{
		res.send(response.body);
	}
});

	
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});