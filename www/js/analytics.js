function trackAppOpened() {
    if(getSendUsageFlag()) {
        var appOpened = {
            userId: getUserId(),
            debug: global.debugMode
        };
    
        global.client.addEvent("appOpened", appOpened);
    }
} 

function trackProjectCreated() {
    if(getSendUsageFlag()) {
        var projectCreated = {
            userId: getUserId(),
            debug: global.debugMode
        };
    
        global.client.addEvent("projectCreated", projectCreated);
    }    
}   

function trackProjectOpened() {
    if(getSendUsageFlag()) {
        var projectOpened = {
            userId: getUserId(),
            debug: global.debugMode
        };
    
        global.client.addEvent("projectOpened", projectOpened);
    }    
}   

function trackProjectRemoved() {
    if(getSendUsageFlag()) {
        var projectRemoved = {
            userId: getUserId(),
            debug: global.debugMode
        };
    
        global.client.addEvent("projectRemoved", projectRemoved); 
    }
}