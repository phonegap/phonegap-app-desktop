var http = require('http');
var url = require('url');

const PORT = 8080;

http.createServer(function(request, response) {
    var clientVersion = url.parse(request.url, true).query.version;
    var req = require('request');
    var jsonUrl = 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/master/package.json';

    var options = {
        url: jsonUrl,
        json: true
    };

    req(options, function(error, res, body) {
        if(!error && res.statusCode === 200) {
            console.log('serverVersion: ' + body.version + ' clientVersion: ' + clientVersion);
            if (body.version > clientVersion) {
                console.log('update available');
                // TODO: updateJSON needs to be generated based on desktop platform (win32 or darwin)
                var updateJSON = JSON.stringify({ url: "https://github.com/phonegap/phonegap-app-desktop/releases/download/0.2.1/PhoneGap-Desktop-Beta-0.2.1-mac.zip"});
                response.statusCode = 200;
                response.statusMessage = 'Update Available';
                response.end(updateJSON);
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
