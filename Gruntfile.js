module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
        build_dir: './build', // Destination for built apps.
        mac: true,            // OS X support.
        win: true,            // Windows support.
        linux32: false,       // Linux 32-bit support.
        linux64: false        // Linux 64-bit support.
      },
      src: ['./www/**/*', './node_modules/phonegap/**/*']
    }
  });

  // Load the grunt plugins.
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Register the task to install nodewebkit dependencies.
  grunt.task.registerTask('install-dependencies', function() {
    var exec = require('child_process').exec,
        callback = this.async();

    exec('npm install --production', { cwd: './www' }, function(e, stdout, stderr) {
      console.log(stdout);
      callback();
    });
  });

  // Register the task to open an app.
  grunt.task.registerTask('open', 'Open the app', function() {
    var os = require('os'),
        opener = require('opener'),
        appName = grunt.config('pkg.name'),
        macPath = 'build/releases/appName/mac/appName.app',
        winPath = 'build/releases/appName/win/appName/appName.exe';

    macPath = macPath.replace(/appName/g, appName);
    winPath = winPath.replace(/appName/g, appName);

    opener((os.platform() === 'darwin') ? macPath : winPath);
  });

  // Default tasks.
  grunt.registerTask('default', ['install-dependencies', 'nodewebkit']);

};
