module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          'www/css/index.css': 'src/less/index.less'
        }
      }
    },
    nwjs: {
      options: {
        version: '0.12.0',
        build_dir: './build', // Destination for built apps.
        mac: true,            // OS X support.
        win: true,            // Windows support.
        linux32: false,       // Linux 32-bit support.
        linux64: false,        // Linux 64-bit support.
        credits: 'www/credits.html',
        mac_icns: 'www/img/app-icons/icon.icns',
        winIco: 'www/img/app-icons/icon.ico'
      },
      src: ['./www/**/*', './node_modules/phonegap/**/*']
    },
    watch: {
      files: ['./src/less/**/*'],
      tasks: ['less']
    }
  });

  // Load the grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nw-builder');

  // Register the task to install nodewebkit dependencies.
  grunt.task.registerTask('install-dependencies', function() {
    var exec = require('child_process').exec,
        callback = this.async();

    exec('npm install --production', { cwd: './www' }, function(e, stdout, stderr) {
      console.log(stdout);
      callback();
    });
  });

  grunt.task.registerTask('copy-dev-config', function() {
      //var config = grunt.file.read('./src/config/package.json');
      grunt.file.copy('./src/config/package.json', './www/package.json');

  });

  grunt.task.registerTask('copy-release-config', function() {
      var config = grunt.file.read('./src/config/package.json');
      var releaseConfig = config.replace("\"toolbar\": true", "\"toolbar\": false");
      grunt.file.write('./www/package.json', releaseConfig);
  });

  grunt.task.registerTask('copy-eula', function() {
      grunt.file.copy('./src/license.txt', './res/installers/osx/license.txt');
      grunt.file.copy('./src/license.txt', './res/installers/win/license.txt');
  });

  // Remove build directories
  grunt.task.registerTask('clean-build-dir', function() {
      var shell = require('shelljs');
      shell.rm('-rf', './build/PhoneGap/osx32');
      shell.rm('-rf', './build/PhoneGap/osx64');
      shell.rm('-rf', './build/PhoneGap/win32');
      shell.rm('-rf', './build/PhoneGap/win64');
      shell.rm('-rf', './build/PhoneGap/linux32');
      shell.rm('-rf', './build/PhoneGap/linux64');
  });

  // Register the task to open an app.
  grunt.task.registerTask('open', 'Open the app', function() {
	var fs = require('fs'),
        os = require('os'),
        opener = require('opener'),
        appName = JSON.parse(fs.readFileSync('./www/package.json')).name,
        architecture = os.arch(),
        macPath = '',
        winPath = '';

        switch (architecture) {
            case 'x64':
                macPath = 'build/appName/osx64/appName.app',
                winPath = 'build/appName/win64/appName.exe';
                break;
            case 'ia32':
                macPath = 'build/appName/osx32/appName.app',
                winPath = 'build/appName/win32/appName.exe';
                break;
            default:
                macPath = 'build/appName/osx/appName.app',
                winPath = 'build/appName/win/appName.exe';

        }

    macPath = macPath.replace(/appName/g, appName);
    winPath = winPath.replace(/appName/g, appName);

    opener((os.platform() === 'darwin') ? macPath : winPath);
  });

  // Default tasks.
  grunt.registerTask('default', ['install-dependencies', 'less', 'copy-dev-config', 'copy-eula', 'clean-build-dir', 'nwjs', 'open']);
  grunt.registerTask('release', ['install-dependencies', 'less', 'copy-release-config', 'copy-eula', 'clean-build-dir', 'nwjs']);

};
