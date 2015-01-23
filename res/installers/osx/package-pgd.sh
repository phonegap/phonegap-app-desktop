#! /bin/bash 
test -f ../../../installers/osx/PhoneGapDesktop.dmg && rm ../../../installers/osx/PhoneGapDesktop.dmg 

./create-dmg \
--volname "PhoneGap Desktop Installer" \
--window-size 500 300 \
--icon-size 48 \
--icon PhoneGap.app 100 110 \
--hide-extension PhoneGap.app \
--app-drop-link 230 110 \
--eula license.txt \
../../../installers/osx/PhoneGapDesktop.dmg \
../../../build/PhoneGap/OSX