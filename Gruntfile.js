module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'electron': {
            osxBuild: {
                options: {
                    name: 'PhoneGap',
                    dir: './www',
                    out: './build',
                    version: '0.36.0',
                    platform: 'darwin',
                    arch: 'x64',
                    icon: './www/img/app-icons/icon.icns',
                    asar: true
                }
            },
            winBuild: {
                options: {
                    name: 'PhoneGap',
                    dir: './www',
                    out: './build',
                    version: '0.36.0',
                    platform: 'win32',
                    arch: 'ia32',
                    icon: './www/img/app-icons/icon.ico',
                    asar: true
                }
            }
        }
    });

    // Load the grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-electron');

    // Register the task to install dependencies.
    grunt.task.registerTask('install-dependencies', function() {
        var exec = require('child_process').exec,
        callback = this.async();

        exec('npm install --production', { cwd: './www' }, function(e, stdout, stderr) {
            console.log(stdout);
            callback();
        });
    });

    // OSX code signing
    grunt.task.registerTask('code-sign-osx', function() {
        var shell = require('shelljs');
        shell.exec("codesign --deep --force --verbose --sign 'Mac Developer: Herman Wong (M6QFED29S9)' build/PhoneGap-darwin-x64/PhoneGap.app");
        shell.exec("codesign --force --verbose --sign 'Mac Developer: Herman Wong (M6QFED29S9)' build/PhoneGap-darwin-x64/PhoneGap.app/Contents/MacOS/Electron");
    });

    // Clean node dependencies
    grunt.task.registerTask('clean-node-modules', function() {
        var shell = require('shelljs');
        shell.rm('-rf', './www/node_modules');
    });

    grunt.task.registerTask('copy-dev-config', function() {
        grunt.file.copy('./src/config/package.json', './www/package.json');
    });

    grunt.task.registerTask('copy-release-config', function() {
        var config = grunt.file.read('./src/config/package.json');
        var releaseConfig = config.replace('"devTools" : true', '"devTools" : false');
        grunt.file.write('./www/package.json', releaseConfig);
    });

    grunt.task.registerTask('copy-eula', function() {
        grunt.file.copy('./src/license.txt', './res/installers/osx/license.txt');
        grunt.file.copy('./src/license.txt', './res/installers/win/license.txt');
    });

    // Clean build directories
    grunt.task.registerTask('clean-build-dir', function() {
        var shell = require('shelljs');
        shell.rm('-rf', './build');
    });

    // Open the built app
    grunt.task.registerTask('open', function() {
        var os = require('os'),
            fs = require('fs'),
            opener = require('opener'),
            macPath = 'build/PhoneGap-darwin-x64/PhoneGap.app',
            winPath = 'build/PhoneGap-win32-ia32/PhoneGap.exe';
            opener((os.platform() === 'darwin') ? macPath : winPath);
    });

    grunt.registerTask('default', ['clean-node-modules', 'install-dependencies', 'copy-dev-config', 'copy-eula', 'clean-build-dir', 'electron', 'code-sign-osx', 'open']);
    grunt.registerTask('release', ['clean-node-modules', 'install-dependencies', 'copy-release-config', 'copy-eula', 'clean-build-dir', 'electron', 'code-sign-osx', 'open']);
};
