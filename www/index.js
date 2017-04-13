// Module to control application life.
const {app} = require('electron');
// Module to create native browser window.
const {BrowserWindow} = require('electron');
const {crashReporter} = require('electron');

const ConfigStore = require('configstore');
const conf = new ConfigStore('insight-phonegap');

var fs = require('fs');
var path = require('path');
const osName = require('os-name');

var uuid = require("uuid/v4");

const {ipcMain} = require('electron');

ipcMain.on('errorInWindow', function(event, messageOrEvent, source, lineno, colno, error){
    /*
    mainWindow.webContents.executeJavaScript('console.log("messageOrEvent: ' + messageOrEvent + '");');
    mainWindow.webContents.executeJavaScript('console.log("source: ' + source + '");');
    mainWindow.webContents.executeJavaScript('console.log("lineno: ' + lineno + '");');
    mainWindow.webContents.executeJavaScript('console.log("colno: ' + colno + '");');
    mainWindow.webContents.executeJavaScript('console.log("error: ' + error + '");');
    */
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let debugMode;
let packageReadError;

try {
    var object = fs.readFileSync(path.join(__dirname, 'package.json'));
    debugMode = JSON.parse(object).window.devTools;
} catch (err) {
    packageReadError = err;
}

var testServer = 'https://serene-harbor-73595.herokuapp.com/';
var prodServer = 'https://desktop-crash-reporter.herokuapp.com/';

crashReporter.start({
    productName: 'PhoneGap-Desktop',
    companyName: 'Adobe',
    submitURL: testServer,
    uploadToServer: true,
    extra: crashReporterJSON()
});

function generateId() {
    // used to generate Ids for user & projects
    var id = uuid();
    return id;
}

function initSessionId() {
    var key = 'sessionId';
    conf.set(key, generateId());
}

function getSessionId() {
    var key = 'sessionId';
    var sessionId = generateId();
    if (conf.has(key)) {
        sessionId = conf.get(key);
    } else {
        conf.set(key, sessionId);
    }
    return sessionId;
}

function clearSessionId() {
    var key = 'sessionId';
    if (conf.has(key)) {
        conf.delete(key);
    }
}

function checkForClientId() {
    // check the configstore to see if clientId exists
    var key = 'clientId';
    if (!conf.has(key)) {
        conf.set(key, generateId());
    }
    return conf.get(key).toString();
}

function crashReporterJSON() {
    var json = {};
    json.version = "1.1";
    json.host = "desktop";
    json.short_message = "crashReporter";
    json._userID = checkForClientId();
    json._platform = osName();
    json._appVersion = app.getVersion();
    json._env = debugMode ? "1" : "0";
    json._session = getSessionId();
    json._nodeVersion = process.version;
    return json;
}

function createWindow () {

    // Create the browser window.
    if (process.platform != 'win32') {
        mainWindow = new BrowserWindow({width: 450, height: 622, resizable: false, title: 'PhoneGap', center: true});
    } else {
        mainWindow = new BrowserWindow({width: 463, height: 656, resizable: false, title: 'PhoneGap', center: true});
    }

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    if (debugMode) {
        // Open the devtools.
        mainWindow.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        clearSessionId();
        app.quit();
    });

    //process.crash();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
    initSessionId();

    if (!packageReadError) {
        createWindow();
    }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
})
