'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var debugMode = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 450, height: 622, resizable: false, title: 'PhoneGap Desktop', center: true});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    var fs = require('fs');
    var pathToPackageJSONFile = __dirname + "/package.json";
    fs.readFile(pathToPackageJSONFile, 'utf8', function(err, data) {
        if (err) {
            mainWindow.webContents.executeJavaScript('console.log("not found");');
        } else {
            mainWindow.webContents.executeJavaScript('console.log("found");');
            var obj = JSON.parse(data);
            debugMode = obj.window.devTools;

            if (debugMode) {
                // Open the devtools.
                mainWindow.openDevTools();
            }
        }
    });

    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.webContents.executeJavaScript('console.log("current version: '+ app.getVersion() +' ");');
        mainWindow.webContents.executeJavaScript('console.log("debugMode: '+ debugMode +' ");');
        mainWindow.webContents.executeJavaScript('setDebugFlag('+ debugMode +');');
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        app.quit();
    });
});
