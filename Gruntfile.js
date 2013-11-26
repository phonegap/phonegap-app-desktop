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
        src: ['./package.json', './www/**/*']
    }
  });

  // Load the grunt plugins.
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Default tasks.
  grunt.registerTask('default', ['nodewebkit']);

};
