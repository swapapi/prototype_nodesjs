var express = require('express');
var request = require('request');

var app = express();

var asSwaps = [];

asSwaps["google"] = 'http://www.google.com';
asSwaps["samt.st"] = 'http://samt.st';
asSwaps["testsearch"] = 'http://media-dump.samt.st/api/search/?q=directory%3Dglasgow_bowman_autumn&m=search-mode&page=1&_=1420322454966';

app.get('*', function (req, res) {

	var sBuildResult = '';

	// remove leading slash
	var sPath = req.originalUrl.replace(/^\//, '');

	sBuildResult += "req: " + sPath;
	sBuildResult += "<br/>swap for: " + (asSwaps[sPath] || '.. no swap found..') + '<br/>';

	if(asSwaps[sPath])
	{
		// there is swap for us to perform
		request.get(asSwaps[sPath], function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        sBuildResult += body;
		        // Continue with your processing here.
		        res.send(body);
		    }
		});
	}

	// finished, send the result
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});