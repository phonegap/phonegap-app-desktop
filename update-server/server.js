const PORT = process.env.PORT || 8080;

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.status(200).send('hello');
});

app.get('/desktop', function (req, res) {
    var queryData = req.query; //url.parse(req.url, true).query;
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
            //serverVersion = '0.2.2';
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
                    // test update zip (OSX)
                    //updateJSON = JSON.stringify({url: 'https://github.com/phonegap/phonegap-app-desktop/blob/0.2.2/update-server/test/PhoneGap-test-0.2.2-mac.zip?raw=true'});
                    // test update zip (Win32)
                    //updateJSON = JSON.stringify({url: 'https://github.com/phonegap/phonegap-app-desktop/blob/0.2.2/update-server/test/PhoneGap-test-0.2.2-win.zip?raw=true'});
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
                console.log('no udpate');
                res.statusCode = 204;
                res.statusMessage = 'No Content';
                res.end();
            }
        }
    });
});

<<<<<<< 29979808e786192d6d9eed1117ef2afc2f862c75
app.get('/health', function(req, res) {
    res.status(200).send('ok');
});

app.listen(PORT, function () {
=======
app.listen(PORT, 'localhost', function () {
>>>>>>> [#541] use the correct response context when returning a response
    console.log('server started on port: ' + PORT);
});
