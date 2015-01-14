#! /bin/bash
test -f ../../../installers/osx/PhoneGapDesktop.dmg && rm ../../../installers/osx/PhoneGapDesktop.dmg
./create-dmg --window-size 500 300 --icon-size 48 --volname "PhoneGap Desktop Installer" --app-drop-link 330 205 --icon "PhoneGap Desktop" 110 205 ../../../installers/osx/PhoneGapDesktop.dmg ../../../build/PhoneGap/OSX