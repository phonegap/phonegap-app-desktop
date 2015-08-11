module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'build-electron-app': {
            options: {
                platforms: ["darwin", "win32"],
                app_dir: './www',
                build_dir: './build'
            }
        }
    });

    // Load the grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-electron-app-builder');

    // Register the task to install dependencies.
    grunt.task.registerTask('install-dependencies', function() {
        var exec = require('child_process').exec,
        callback = this.async();

        exec('npm install --production', { cwd: './www' }, function(e, stdout, stderr) {
            console.log(stdout);
            callback();
        });
    });

    // Remove build directories
    grunt.task.registerTask('clean-build-dir', function() {
        var shell = require('shelljs');
        shell.rm('-rf', './build/darwin');
        shell.rm('-rf', './build/win32');
    });

    // Rename app from Electron to PhoneGap
    grunt.task.registerTask('rename-app', function() {
        var fs = require('fs');
        fs.rename('./build/darwin/Electron.app', './build/darwin/PhoneGap.app');
        fs.rename('./build/win32/electron.exe', './build/win32/PhoneGap.exe');
    });

    // Open the built app
    grunt.task.registerTask('open', function() {
        var os = require('os'),
            fs = require('fs'),
            opener = require('opener'),
            appName = JSON.parse(fs.readFileSync('./www/package.json')).name,
            macPath = 'build/darwin/appName.app',
            winPath = 'build/win32/appName.exe';

            macPath = macPath.replace(/appName/g, appName);
            winPath = winPath.replace(/appName/g, appName);

            opener((os.platform() === 'darwin') ? macPath : winPath);
    });

    grunt.registerTask('default', ['install-dependencies', 'clean-build-dir', 'build-electron-app', 'rename-app', 'open']);

};
