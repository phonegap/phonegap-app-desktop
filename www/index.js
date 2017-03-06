// Module to control application life.
const {app} = require('electron');
// Module to create native browser window.
const {BrowserWindow} = require('electron');

const {ipcMain} = require('electron');
//ipcMain.on('errorInWindow', function(event, arg){
ipcMain.on('errorInWindow', function(event, messageOrEvent, source, lineno, colno, error){
    mainWindow.webContents.executeJavaScript('console.log("messageOrEvent: ' + messageOrEvent + '");');
    mainWindow.webContents.executeJavaScript('console.log("source: ' + source + '");');
    mainWindow.webContents.executeJavaScript('console.log("lineno: ' + lineno + '");');
    mainWindow.webContents.executeJavaScript('console.log("colno: ' + colno + '");');
    mainWindow.webContents.executeJavaScript('console.log("error: ' + error + '");');
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let debugMode;

function createWindow () {
    // Create the browser window.
    if (process.platform != 'win32') {
        mainWindow = new BrowserWindow({width: 450, height: 622, resizable: false, title: 'PhoneGap', center: true});
    } else {
        mainWindow = new BrowserWindow({width: 463, height: 656, resizable: false, title: 'PhoneGap', center: true});
    }

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

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

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        app.quit();
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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
