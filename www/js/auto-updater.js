function checkForUpdates(updater) {

    var app = remote.require('app');

    updater.on('error', function(e) {
        console.log('error: ' + e.message);
    })
    .on('checking-for-update', function(e) {
        console.log("checking-for-update");
    })
    .on('update-available', function(e) {
        console.log("update-available");
    })
    .on('update-not-available', function(e) {
        console.log("update-not-available");
    });

    // TODO: remove hardcoded version before we go into production
    var feedUrl = 'http://localhost:8080?platform=' + determineOperatingSystem() + '&version=' + '0.2.0';//app.getVersion();
    console.log(feedUrl);

    updater.setFeedUrl(feedUrl);
    updater.checkForUpdates();
}
