// This file handles the extraction of npm and
// installation of the PhoneGap CLI for Windows

// quit if not on Windows
if (process.platform != 'win32') {
    return;
}

var AdmZip = require('adm-zip');
var execFile = require('child_process').execFileSync;
var path = require('path');

// extract npm to C:/ProgramData/PhoneGap/
console.log('Extracting npm module...');
var npmPath = path.join('C:/ProgramData/', 'Adobe', 'PhoneGap');
var zip = AdmZip(path.join(__dirname, 'npm.zip'));
zip.extractAllTo(npmPath, true);
console.log('Extraction complete!');

// install phonegap-cli to app.asar.unpacked
var pgVersion = 'REPLACE_ME';

var args = [];
args.push(path.join(npmPath, 'npm/bin/npm-cli.js'));
args.push('install');
args.push('phonegap@' + pgVersion);

var options = {
    cwd: path.join(__dirname, '..'),
    silent: true
};

console.log('Downloading PhoneGap CLI...');
var child = execFile(path.join(__dirname, 'node.exe'), args, options);
console.log('Download complete!');
