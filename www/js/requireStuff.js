var remote = require('electron').remote;
var webFrame = require('electron').webFrame;

webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);

// load dependencies module
var fs = require("fs");
var jsxml= require("node-jsxml");
var opener = require("opener");
var path = require("path");
var shell = require('electron').shell;
var uuid = require("uuid/v4");

var Namespace = jsxml.Namespace,
    QName = jsxml.QName,
    XML = jsxml.XML,
    XMLList = jsxml.XMLList;

const {autoUpdater} = require('electron').remote;
const {dialog} = require('electron').remote;
const {app} = require('electron').remote;

var ipc = require('electron').ipcRenderer;

const {crashReporter} = require('electron');

const ConfigStore = require('configstore');
const conf = new ConfigStore('insight-phonegap');
