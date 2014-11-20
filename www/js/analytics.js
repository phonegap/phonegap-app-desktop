function trackAppOpened() {
    var appOpened = {
        userId: getUserId(),
        keen: {
            timestamp: new Date().toISOString()
        }
    };
    
    global.client.addEvent("appOpened", appOpened);
}