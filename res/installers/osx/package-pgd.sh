#! /bin/bash
if test -e ./installers/osx64; then
    echo "osx64 directory already exists"
else
    echo "creating osx64 directory"
    mkdir -p ./installers/osx64
fi

test -f ./installers/osx64/PhoneGapDesktop.dmg && rm ./installers/osx64/PhoneGapDesktop.dmg

./res/installers/osx/create-dmg \
--volname "PhoneGap Desktop Installer" \
--background ./res/installers/osx/bg-512-320.png \
--window-size 512 320 \
--icon-size 120 \
--icon PhoneGap.app 128 160 \
--hide-extension PhoneGap.app \
--app-drop-link 388 160 \
--eula ./res/installers/osx/license.rtf \
./installers/osx64/PhoneGapDesktop.dmg \
./build/PhoneGap-darwin-x64/PhoneGap.app
