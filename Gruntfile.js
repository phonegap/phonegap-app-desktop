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

    // Remove node dependencies
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

    // Remove build directories
    grunt.task.registerTask('clean-build-dir', function() {
        var shell = require('shelljs');
        shell.rm('-rf', './build');
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

    grunt.registerTask('default', ['clean-node-modules', 'install-dependencies', 'copy-dev-config', 'clean-build-dir', 'build-electron-app', 'rename-app', 'open']);
    grunt.registerTask('release', ['clean-node-modules', 'install-dependencies', 'copy-release-config', 'clean-build-dir', 'build-electron-app', 'rename-app', 'open']);
};
