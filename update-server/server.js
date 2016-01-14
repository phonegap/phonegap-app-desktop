var http = require('http');
var url = require('url');

const PORT = 8080;

http.createServer(function(request, response) {
    var queryData = url.parse(request.url, true).query
    var clientVersion = queryData.version;
    var platform = queryData.platform;
    var req = require('request');
    var jsonUrl = 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/master/package.json';

    var options = {
        url: jsonUrl,
        json: true
    };

    req(options, function(error, res, body) {
        if(!error && res.statusCode === 200) {
            console.log('serverVersion: ' + body.version + ' clientVersion: ' + clientVersion);
            console.log('platform: ' + platform);

            if (body.version > clientVersion) {
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

                    response.statusCode = 200;
                    response.statusMessage = 'Update Available';
                    response.end(updateJSON);
                } else {
                    console.log('no downloadUrl - return no update');
                    response.statusCode = 204;
                    response.statusMessage = 'No Content';
                    response.end();
                }

            } else {
                console.log('no udpate');
                response.statusCode = 204;
                response.statusMessage = 'No Content';
                response.end();
            }
        }
    });

}).listen(PORT, function() {
    console.log('server started on: http://localhost:' + PORT);
});
