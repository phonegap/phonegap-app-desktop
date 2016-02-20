const PORT = process.env.PORT || 8080;

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.status(200).send('hello');
});

app.get('/desktop', function (req, res) {
    var queryData = req.query;
    var clientVersion = queryData.version;
    var platform = queryData.platform;
    var jsonUrl = 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/master/package.json';
    var request = require('request');

    var options = {
        url: jsonUrl,
        json: true
    };

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);

    request(options, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            var serverVersion = body.version;
            console.log('serverVersion: ' + serverVersion + ' clientVersion: ' + clientVersion);
            console.log('platform: ' + platform);

            if (serverVersion > clientVersion) {
                console.log('update available');

                var downloadUrl = null;
                var updateJSON = null;

                if (platform === 'darwin') {
                    downloadUrl = body.packages.mac.url;
                }
                if (platform === 'win32') {
                    downloadUrl = body.packages.win.url;
                }

                if (downloadUrl) {
                    updateJSON = JSON.stringify({url: downloadUrl});
                    console.log('updateJSON: ' + updateJSON);

                    res.writeHead(200, {'Accept':'application/zip'});
                    res.statusMessage = 'Update Available';
                    res.end(updateJSON);
                } else {
                    console.log('no downloadUrl - return no update');
                    res.statusCode = 204;
                    res.statusMessage = 'No Content';
                    res.end();
                }

            } else {
                console.log('no update');
                res.statusCode = 204;
                res.statusMessage = 'No Content';
                res.end();
            }
        }
    });
});

app.get('/desktop/:branch', function (req, res) {
    var queryData = req.query;
    var clientVersion = queryData.version;
    var platform = queryData.platform;
    var branch = req.params.branch;
    var jsonUrl = 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/' + branch + '/package.json';
    var request = require('request');

    console.log('branch url: ' + jsonUrl);

    var options = {
        url: jsonUrl,
        json: true
    };

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);

    request(options, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            var serverVersion = body.version;
            console.log('serverVersion: ' + serverVersion + ' clientVersion: ' + clientVersion);
            console.log('platform: ' + platform);

            if (serverVersion > clientVersion) {
                console.log('update available');

                var downloadUrl = null;
                var updateJSON = null;

                if (platform === 'darwin') {
                    downloadUrl = body.packages.mac.url;
                }
                if (platform === 'win32') {
                    downloadUrl = body.packages.win.url;
                }

                if (downloadUrl) {
                    updateJSON = JSON.stringify({url: downloadUrl});
                    console.log('updateJSON: ' + updateJSON);

                    res.writeHead(200, {'Accept':'application/zip'});
                    res.statusMessage = 'Update Available';
                    res.end(updateJSON);
                } else {
                    console.log('no downloadUrl - return no update');
                    res.statusCode = 204;
                    res.statusMessage = 'No Content';
                    res.end();
                }

            } else {
                console.log('no update');
                res.statusCode = 204;
                res.statusMessage = 'No Content';
                res.end();
            }
        }
    });
});

app.get('/health', function(req, res) {
    res.status(200).send('ok');
});

app.listen(PORT, function () {
    console.log('server started on port: ' + PORT);
});
