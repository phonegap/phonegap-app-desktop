## Phonegap Desktop App [![Build Status](https://travis-ci.org/phonegap/phonegap-app-desktop.svg?branch=master)](https://travis-ci.org/phonegap/phonegap-app-desktop) [![bitHound Score](https://www.bithound.io/github/phonegap/phonegap-app-desktop/badges/score.svg)](https://www.bithound.io/github/phonegap/phonegap-app-desktop)

## Quick Start - Developer Mode

1. Run `npm install` from the root of this project to set up the project dependencies
2. `cd` into the `www` folder and run `npm install` for the app dependencies
3. `cd ..` back to the root and run `npm run reload` to start up the live reload server for live code updates
4. Run `electron www` from the root folder  or `electron .` from the `www` folder
 
**NOTE:** Steps 1 & 2 only need to be done if you've never run a local build or when the dependencies are updated. 

## Installation for OSX

```
install the latest XCode from the Mac App Store
```

```
# install grunt cli
$ [sudo] npm install -g grunt-cli

# install homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# install xQuartz
brew install Caskroom/cask/xquartz

# install wine
brew install wine --devel

# install mono
brew install mono

# add export MONO_GAC_PREFIX="/usr/local" to.bash_profile`
# reload .bash_profile by typing in:
. ~/.bash_profile

#install samba
brew install samba

# install dev dependencies
$ npm install

# Create a fork of the phonegap-app-desktop repository.
# Clone your fork of the repository.
# Navigate to project folder on your local machine.
# Follow instructions in the Build section.
```

## Build

```
# builds development version
grunt

# builds release version
grunt -release
```
