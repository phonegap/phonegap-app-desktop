#! /bin/bash 
test -f ../../../installers/osx/PhoneGapDesktop.dmg && rm ../../../installers/osx/PhoneGapDesktop.dmg 

./create-dmg \
--volname "PhoneGap Desktop Installer" \
--background "bg-512-320.png" \
--window-size 512 320 \
--icon-size 64 \
--icon PhoneGap.app 125 160 \
--hide-extension PhoneGap.app \
--app-drop-link 385 160 \
--eula license.txt \
../../../installers/osx/PhoneGapDesktop.dmg \
../../../build/PhoneGap/OSX