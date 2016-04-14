function checkForUpdates(updater) {

    var app = remote.require('app');

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

    // optional branch param can be used for testing
    // http://localhost:8080/desktop/<branch>/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    //var feedUrl = 'http://localhost:8080/desktop/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    var feedUrl = 'http://update.api.phonegap.com/desktop/?platform=' + determineOperatingSystem() + '&version=' + app.getVersion();
    console.log(feedUrl);

    updater.setFeedUrl(feedUrl);
    updater.checkForUpdates();
}
