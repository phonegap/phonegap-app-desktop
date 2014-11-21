function trackAppOpened() {
    var appOpened = {
        userId: getUserId(),
        debug: global.debugMode
    };
    
    global.client.addEvent("appOpened", appOpened);
} 

function trackProjectCreated() {
    var projectCreated = {
        userId: getUserId(),
        debug: global.debugMode
    };
    
    global.client.addEvent("projectCreated", projectCreated);    
}   

function trackProjectOpened() {
    var projectOpened = {
        userId: getUserId(),
        debug: global.debugMode
    };
    
    global.client.addEvent("projectOpened", projectOpened);    
}   

function trackProjectRemoved() {
    var projectRemoved = {
        userId: getUserId(),
        debug: global.debugMode
    };
    
    global.client.addEvent("projectRemoved", projectRemoved);    
}