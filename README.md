## Phonegap Desktop App [![Build Status](https://travis-ci.org/phonegap/phonegap-app-desktop.svg?branch=master)](https://travis-ci.org/phonegap/phonegap-app-desktop) [![bitHound Score](https://www.bithound.io/github/phonegap/phonegap-app-desktop/badges/score.svg)](https://www.bithound.io/github/phonegap/phonegap-app-desktop)

## Quick Start - Developer Mode

1. Run `npm install` from the root of this project to set up the project dependencies
2. `cd` into the `www` folder and run `npm install` for the app dependencies
3. `cd ..` back to the root and run `npm run reload` to start up the live reload server for live code updates
4. Run `electron www` from the root folder  or `electron .` from the `www` folder

**NOTE:** Steps 1 & 2 only need to be done if you've never run a local build or when the dependencies are updated.

## Build Setup for macOS & Windows

```
# install grunt cli
$ [sudo] npm install -g grunt-cli

# install dev dependencies
$ npm install

# Create a fork of the phonegap-app-desktop repository.
# Clone your fork of the repository.
# Navigate to project folder on your local machine.
# Follow instructions in the Build Commands section.
```

## Build Setup for Linux (tested on Ubuntu only)

```
# install grunt cli
$ [sudo] npm install -g grunt-cli

# install dev dependencies
$ npm install
$ sudo apt install wine-stable
$ sudo apt-get install libgconf-2-4

# Create a fork of the phonegap-app-desktop repository.
# Clone your fork of the repository.
# Navigate to project folder on your local machine.
# Follow instructions in the Build Commands section.

### Windows Gotchas

Once the build is complete, you will need to follow the instructions under `Installation for Windows`.

## Build Commands

```
# builds development version
$ grunt

# builds release version
$ grunt release
```

## Installation for Windows

If you are using the zip file to run the Desktop App, you will need to run the
`postInstall.bat` file to install the required dependencies. The file is in
`./build/PhoneGap-win32-ia32/resources/app.asar.unpacked/bin`. Right click on the file
and select "Run as administrator", once the script has finished running you will
be able to use the app.
