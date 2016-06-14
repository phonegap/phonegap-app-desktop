function checkForUpdates(updater) {

    var app = require('electron').remote.app;
    var jsonUrl = 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/master/package.json';

    $.getJSON(jsonUrl).done(function(json) {
        var clientVersion = app.getVersion();
        var serverVersion = JSON.stringify(json.version);

        console.log("server: " + serverVersion + " client: " + clientVersion);

        // TODO: change to > before production
        if (serverVersion < clientVersion) {
            console.log("update-available");
            $('#updateOverlayTitle').text('Update Available');
            $('#updateOverlayPrompt').text('A newer version of PhoneGap Desktop was found. Would you like PhoneGap Desktop to download the update & restart?');
            $("#overlay-bg").show();
            $('#updateOverlay').show();
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Update check failed: " + err);
        alert("Update check failed: " + err);
    });
}

function updateDesktopApp() {
    console.log("updateDesktopApp");

    /*
    updater.on('error', function(err, msg) {
        $('#updateOverlay').hide();
        console.log(msg);
        displayErrorMessage('PhoneDesktop could not update because of the following error:\n\n' + msg);
    })
    .on('checking-for-update', function(err, msg) {
        console.log("checking-for-update");
    })
    .on('update-available', function(err) {
        console.log("update-available");
        $('#updateOverlayTitle').text('Update Available');
        $('#updateOverlayPrompt').text('A newer version of PhoneGap Desktop was found. PhoneGap Desktop will automatically download the update & restart.');
        $('#updateOverlay').show();
    })
    .on('update-downloaded', function(err) {
        console.log('update-downloaded');
        $('#updateOverlay').hide();
        updater.quitAndInstall();
    })
    .on('update-not-available', function(err) {
        console.log("update-not-available");
    });
    */

    // optional branch param can be used for testing
    // http://localhost:8080/desktop/<branch>/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    //var feedUrl = 'http://localhost:8080/desktop/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    var feedUrl = 'http://update.api.phonegap.com/desktop/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    console.log(feedUrl);

    //updater.setFeedURL(feedUrl);
    //updater.checkForUpdates();
}
