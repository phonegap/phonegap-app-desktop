const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let debugMode

function createWindow () {
    // Create the browser window.
    if (process.platform != 'win32') {
        mainWindow = new BrowserWindow({width: 450, height: 622, resizable: false, title: 'PhoneGap', center: true})
    } else {
        mainWindow = new BrowserWindow({width: 463, height: 656, resizable: false, title: 'PhoneGap', center: true})
    }

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html')

  var fs = require('fs')
  var pathToPackageJSONFile = __dirname + "/package.json"
  fs.readFile(pathToPackageJSONFile, 'utf8', function(err, data) {
      if (err) {
          mainWindow.webContents.executeJavaScript('console.log("not found");')
      } else {
          mainWindow.webContents.executeJavaScript('console.log("found");')
          var obj = JSON.parse(data);
          debugMode = obj.window.devTools;

          if (debugMode) {
              // Open the devtools.
              mainWindow.openDevTools();
          }
      }
  });

    mainWindow.webContents.on('did-finish-load', function() {

        // manual update notification on Windows
        if (process.platform === 'win32') {
            var request = require('request')
            request({
                    method: 'GET',
                    uri: 'https://raw.githubusercontent.com/phonegap/phonegap-app-desktop/master/package.json',
                    json: true
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        // get the PG version on github
                        var remoteVersion = body.version;
                        mainWindow.webContents.executeJavaScript('console.log("remote version: '+ remoteVersion +' ");')

                        // check local version against PG version on github to see if update is available
                        if (remoteVersion > app.getVersion()) {
                            var updateDialog = electron.dialog;
                            var buttons = ['Update Now', 'Cancel']
                            var msg = "PhoneGap Desktop version " + remoteVersion + " is now available. Would you like to update?"
                            // prompt user to update their version
                            updateDialog.showMessageBox(
                                mainWindow,
                                {
                                    type: 'question',
                                    title: 'PhoneGap Update Notification',
                                    buttons: buttons,
                                    message: msg,
                                    cancelId: 1
                                },
                                function (buttonIndex) {
                                    if (buttonIndex == 0) {
                                        var shell = require('electron').shell
                                        shell.openExternal("https://github.com/phonegap/phonegap-app-desktop/releases")
                                    }
                                }
                            )
                        }
                    }
                }
            )
        }

        mainWindow.webContents.executeJavaScript('console.log("current version: '+ app.getVersion() +' ");')
        mainWindow.webContents.executeJavaScript('console.log("debugMode: '+ debugMode +' ");')
        mainWindow.webContents.executeJavaScript('setDebugFlag('+ debugMode +');')
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        app.quit()
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
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
