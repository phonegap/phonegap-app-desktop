# PhoneGap GUI

Initial prototype of creating a GUI for the PhoneGap CLI.

## Getting Started

### Setup

    # install grunt cli
    $ [sudo] npm install -g grunt-cli

    # install dev dependencies
    $ npm install

### Development

    # watch src/ and compile to www/
    $ grunt watch

### Build Development Binaries

    $ grunt

__note:__ the first build requires a second call to `grunt`.

### Build Release Binaries

    $ grunt release

### Run App

    $ grunt open

Opens the application located in:

  - __OS X__: `build/releases/phonegap-gui/mac/phonegap-gui.app`
  - __Windows__: `build/releases/phonegap-gui/win/phonegap-gui/phonegap-gui.exe`
