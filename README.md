# PhoneGap Desktop

Initial prototype of creating a GUI for the PhoneGap CLI.

## Getting Started

### How To Build the PhoneGap Desktop App

    1. Make sure you have Git installed & setup; instructions can be found [here](https://help.github.com/articles/set-up-git/).
    2. Make sure you have nodejs [installed](http://nodejs.org/).
    3. Create a [fork](https://help.github.com/articles/fork-a-repo/) of the `phonegap-gui` repository.
    4. [Clone](https://help.github.com/articles/fork-a-repo/#step-2-create-a-local-clone-of-your-fork) your fork of the repository.
    5. Navigate to project folder on your local machine.
    6. Follow instructions in the _Setup_ section.
    7. Follow instructions in the _Build Development Binaries_ section or the _Build Release Binaries_ section.

### Setup

    # install grunt cli
    $ [sudo] npm install -g grunt-cli

    # install dev dependencies
    $ npm install

### Development

    # watch src/ and compile to www/
    $ grunt watch

### Build Development Binaries

    # builds development binaries & runs the app
    $ grunt

__note:__ the first build requires a second call to `grunt`.

### Build Release Binaries

    # builds release binaries & runs the app
    $ grunt release

### Run App

    # runs app without building
    $ grunt open

Opens the application located in:

  - __OS X__: `build/PhoneGap/osx/PhoneGap.app`
  - __Windows__: `build/PhoneGap/win/PhoneGap.exe`
