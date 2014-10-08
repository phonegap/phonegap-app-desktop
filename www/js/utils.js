function isEmptyField(value) {
    var isEmpty = true;
    
    if (value){
        if (value.length > 0) {
            isEmpty = false;
        }        
    }
       
    return isEmpty;
}

function isProjectPathFieldEmpty(value) {
    var isEmpty = true;
    var prompt = "Please choose a local path";
    
    if (value != prompt) {
        isEmpty = false;
    }
    
    return isEmpty;
}

function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }
        return sortStatus;
    }
}

function openIssueTracker() {
    gui.Shell.openExternal("https://github.com/hermwong/phonegap-gui/issues?state=open");    // opens user's default browser & loads page 
}

function openTutorials() {
    gui.Shell.openExternal("https://github.com/hermwong/phonegap-gui/wiki/PhoneGap-Developer-Desktop-App-Overview");    // opens user's default browser & loads page 
}