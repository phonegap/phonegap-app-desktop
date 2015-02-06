#! /bin/bash 
test -f ../../../installers/osx/PhoneGapDesktop.dmg && rm ../../../installers/osx/PhoneGapDesktop.dmg 

./create-dmg \
--volname "PhoneGap Desktop Installer" \
--background "bg-512-320.png" \
--window-size 512 320 \
--icon-size 120 \
--icon PhoneGap.app 128 160 \
--hide-extension PhoneGap.app \
--app-drop-link 388 160 \
--eula license.txt \
../../../installers/osx/PhoneGapDesktop.dmg \
../../../build/PhoneGap/OSX