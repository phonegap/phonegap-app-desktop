## phonegap-desktop-electron-prototype [![Build Status](https://travis-ci.org/phonegap/phonegap-app-desktop.svg?branch=master)](https://travis-ci.org/phonegap/phonegap-app-desktop) [![bitHound Score](https://www.bithound.io/github/phonegap/phonegap-app-desktop/badges/score.svg)](https://www.bithound.io/github/phonegap/phonegap-app-desktop)

#### Installation
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

#### Build

```
# builds development version
grunt

# builds release version
grunt -release
```
