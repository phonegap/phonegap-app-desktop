function checkForUpdates() {

    var app = require('electron').remote.app;
    var jsonUrl = 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/update-check/package.json';

    $.getJSON(jsonUrl).done(function(json) {
        var clientVersion = app.getVersion().toString();
        var serverVersion = JSON.stringify(json.version);
        serverVersion = serverVersion.replace(/["']/g, "");

        console.log("server: " + serverVersion + " client: " + clientVersion);

        if (serverVersion > clientVersion) {
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

function updateDesktopApp(updater) {
    console.log("updateDesktopApp");

    var app = require('electron').remote.app;

    overlayBackgroundHandler();
    $('#updateOverlay').hide();

    $('#loader-text').text('Update is in progress');
    $('#loading-overlay').show();

    updater.on('error', function(err, msg) {
        console.log(msg);
        $('#loading-overlay').hide();
        $('#loader-text').text('');
        displayErrorMessage('PhoneDesktop could not update because of the following error:\n\n' + msg);
    })
    .on('checking-for-update', function(err, msg) {
        console.log("checking-for-update");
    })
    .on('update-available', function(err) {
        console.log("update-available");
    })
    .on('update-downloaded', function(err) {
        console.log('update-downloaded');
        updater.quitAndInstall();
    })
    .on('update-not-available', function(err) {
        console.log("update-not-available");
        $('#loading-overlay').hide();
        $('#loader-text').text('');
    });

    // optional branch param can be used for testing
    // http://localhost:8080/desktop/<branch>/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    //var feedUrl = 'http://localhost:8080/desktop/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    var feedUrl = 'http://update.api.phonegap.com/desktop/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    console.log(feedUrl);

    updater.setFeedURL(feedUrl);
    updater.checkForUpdates();
}
