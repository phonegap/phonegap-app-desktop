var execSync = require('child_process').execSync;
var shell = require('shelljs');

var APPVERSION = '0.4.2';
var ELECTRONVERSION = '1.4.5';
var isRelease = (process.argv[2] === 'release');

module.exports = function(grunt) {
    var osxArchive = './installers/osx64/PhoneGap-Desktop-Beta-' + APPVERSION + '-mac.zip';
    var winArchive = './installers/win32/PhoneGap-Desktop-Beta-' + APPVERSION + '-win.zip';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'electron': {
            osxBuild: {
                options: {
                    name: 'PhoneGap',
                    dir: './www',
                    out: './build',
                    version: ELECTRONVERSION,
                    platform: 'darwin',
                    arch: 'x64',
                    icon: './www/img/app-icons/icon.icns',
                    asar: false
                }
            },
            winBuild: {
                options: {
                    name: 'PhoneGap',
                    dir: './www',
                    out: './build',
                    version: ELECTRONVERSION,
                    platform: 'win32',
                    arch: 'ia32',
                    icon: './www/img/app-icons/icon.ico',
                    asar: { unpackDir:'{bin,node_modules/adm-zip,node_modules/adm-zip/**}' }
                }
            }
        }
    });

    // Load the grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-electron');

    // Register the task to install dependencies.
    grunt.task.registerTask('install-dependencies', function() {
        execSync('node src/js/download-node.js');

        var npmInstall = 'npm install';
        if (isRelease) {
            npmInstall += ' --production';
        }

        execSync(npmInstall, { cwd: './www' });

        // npm/phonegap workarounds are for Windows, Mac can install normally
        if (process.platform === 'darwin' && isRelease) {
            var config = JSON.parse(grunt.file.read('./src/config/package.json'));
            var pgVersion = config.devDependencies.phonegap;
            execSync('npm install npm@3.10.3 phonegap@' + pgVersion, { cwd: './www' });
        }
    });

    // Clean old files
    grunt.task.registerTask('clean-old-files', function() {
        // clean build directories
        shell.rm('-rf', './build');

        // if we are using debugMac/debugWin commands, don't remove files
        if (process.argv[2] && process.argv[2].includes('debug'))
            return;

        // clean node binary
        var nodePath = './www/bin/node';
        shell.rm('-rf', (process.platform === 'darwin') ? nodePath : (nodePath + '.exe'));

        // clean node dependencies
        shell.rm('-rf', './www/node_modules');

        // clean installers directory for release builds
        if (isRelease) {
            shell.rm('-rf', './installers');
        }
    });

    // start the local server for update checker
    grunt.task.registerTask('start-localhost', function() {
        shell.exec('node ./update-server/server.js');
    });

    // create the OSX DMG installer
    grunt.task.registerTask('osx-installer', function() {
        if (process.platform === 'darwin' && isRelease) {
            // OSX code signing
            var signConfig = grunt.file.readJSON("sign-config.json");
            shell.exec("codesign --verbose --deep --force --sign " + "'"+signConfig.certName+"'" + " build/PhoneGap-darwin-x64/PhoneGap.app");
            shell.exec("codesign --verbose --verify build/PhoneGap-darwin-x64/PhoneGap.app");
            shell.exec("codesign -vv -d build/PhoneGap-darwin-x64/PhoneGap.app");
            shell.exec("codesign --verbose --force --sign " + "'"+signConfig.certName+"'" + " build/PhoneGap-darwin-x64/PhoneGap.app/Contents/MacOS/PhoneGap");
            shell.exec("codesign --verbose --verify build/PhoneGap-darwin-x64/PhoneGap.app/Contents/MacOS/PhoneGap");

            shell.exec('bash ./res/installers/osx/package-pgd.sh');
        }
    });

    grunt.task.registerTask('copy-package-json', function() {
        if (isRelease) {
            // disable the dev console before copying the package.json to www folder
            var config = grunt.file.read('./src/config/package.json');
            var releaseConfig = config.replace('"devTools" : true', '"devTools" : false');
            grunt.file.write('./www/package.json', releaseConfig);
        } else {
            // copy package.json to www folder
            grunt.file.copy('./src/config/package.json', './www/package.json');
        }
    });

    // copy the EULA into the installer folders
    grunt.task.registerTask('copy-eula', function() {
        grunt.file.copy('./src/license.txt', './res/installers/osx/license.txt');
        grunt.file.copy('./src/license.txt', './res/installers/win/license.txt');
    });

    // Open the built app
    grunt.task.registerTask('open', function() {
        // disabling on Windows for now, will re-evaluate in the future
        var opener = require('opener'),
            macPath = 'build/PhoneGap-darwin-x64/PhoneGap.app';
            opener(macPath);
    });

    // default - runs the dev build
    grunt.registerTask(
        'default',
        [
            'clean-old-files',
            'copy-package-json',
            'install-dependencies',
            'copy-eula',
            'electron:' + (process.platform === 'darwin' ? 'osxBuild' : 'winBuild'),
            'open'//,
            //'start-localhost'
        ]
    );

    // production build task
    grunt.registerTask(
        'release',
        [
            'clean-old-files',
            'copy-package-json',
            'install-dependencies',
            'copy-eula',
            'electron:' + (process.platform === 'darwin' ? 'osxBuild' : 'winBuild'),
            'osx-installer',
            'open'
        ]
    );

    grunt.registerTask('debugMac',['clean-old-files','electron:osxBuild','open']);
    grunt.registerTask('debugWin',['clean-old-files','electron:winBuild','open']);
};
