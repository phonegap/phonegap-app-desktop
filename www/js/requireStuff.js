var remote = require('electron').remote;

// load dependencies module
var fs = require("fs");
var gaze = require("gaze");
var jsxml= require("node-jsxml");
var opener = require("opener");
var path = require("path");
var shell = require('electron').shell;
var uuid = require("node-uuid");

var Namespace = jsxml.Namespace,
    QName = jsxml.QName,
    XML = jsxml.XML,
    XMLList = jsxml.XMLList;
