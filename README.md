## PhoneGap App Desktop [![Build status][buildbox-img]][buildbox-url] [![bitHound Score][bithound-img]][bithound-url]

Initial prototype of creating a desktop app for the PhoneGap CLI.

## Getting Started

### How To Build the PhoneGap App Desktop

1. Make sure you have Git installed & setup; instructions can be found [here](https://help.github.com/articles/set-up-git/).
2. Make sure you have nodejs [installed](http://nodejs.org/). 
3. install [homebrew](http://brew.sh/) or update (if you already have homebrew installed) `brew update`
4. install gcc, different methods listed below:
  1. using homebrew:
    1. `brew search gcc` list available version of gcc
    1. `brew install gcc49` or `brew install homebrew/versions/gcc49` depending on what is returned from the `brew search gcc` query (installs gcc version 4.9)
  1. command line without xcode: http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/
  1. using xcode: http://stackoverflow.com/questions/9353444/how-to-use-install-gcc-on-mac-os-x-10-8-xcode-4-4
5. install [wine](http://www.winehq.org) `brew install wine --devel` (dev version is 1.7.32, the current stable __version 1.6.2 caused a bunch of errors and did not work__)
6. you _might_ be prompted to install [XQuartz](http://xquartz.macosforge.org/landing/) before you can complete the wine install.
7. if `libpng16.16.dylib` is missing from `usr/local/lib/`, you can download it from one of the following places:
  1. clone the following project from Git `https://github.com/anura-engine/anura.git` and then copy `anura/MacOS/dylibs/libpng16.16.dylib` from your local repo and paste into `usr/local/lib/`
  1. clone the following project from Git `https://github.com/jyr/MNPP.git` and then copy `MNPP/Library/png/lib/libpng16.16.dylib` from your local repo and paste into `usr/local/lib/`
  1. install php5.5 `brew install homebrew/php/php55` __(was supposed to install libpng16.16.dylib but didn't for me...)__ 
8. install mono `brew install mono`
9. add `export MONO_GAC_PREFIX="/usr/local" to `.bash_profile`
10. reload `.bash_profile` by typing in `. ~/.bash_profile`
11. install samba `brew install samba`
12. Create a [fork](https://help.github.com/articles/fork-a-repo/) of the `phonegap-app-desktop` repository.
13. [Clone](https://help.github.com/articles/fork-a-repo/#step-2-create-a-local-clone-of-your-fork) your fork of the repository.
14. Navigate to project folder on your local machine.
15. Follow instructions in the _Setup_ section.
16. Follow instructions in the _Build Development Binaries_ section or the _Build Release Binaries_ section.

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

[buildbox-img]: https://badge.buildbox.io/d5b26a9e3bc79e808d8cdb483ee14d45d371c9f41bd8371c3b.svg?branch=master
[buildbox-url]: https://buildbox.io/phonegap/phonegap-desktop
[bithound-img]: https://www.bithound.io/github/phonegap/phonegap-app-desktop/badges/score.svg
[bithound-url]: https://www.bithound.io/github/phonegap/phonegap-app-desktop

