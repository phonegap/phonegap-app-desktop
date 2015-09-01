function initFileMenu() {
    var Menu = remote.require('menu');
    var MenuItem = remote.require('menu-item');
    var template = getMenuTemplate();

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function getMenuTemplate() {
    var template = [
        {
            label: 'Electron',
            submenu: [
                {
                    label: 'About PhoneGap',
                    click: function() {
                        aboutContent();
                    }
                },
                {
                    label: 'Quit PhoneGap',
                    click: function() {
                        quitApp();
                    }
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'Create new project',
                    click: function() {
                        global.jQuery("#createProject").trigger('click');
                    }
                },
                {
                    label: 'Add existing project',
                    click: function() {
                        global.jQuery("#openProject").trigger('click');
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Tutorials',
                    click: function() {
                        openTutorials();
                    }
                },
                {
                    label: 'Report Issue',
                    click: function() {
                        openIssueTracker();
                    }
                },
                {
                    label: 'Terms of Use',
                    click: function() {
                        openTermsOfUse();
                    }
                },
                {
                    label: 'Privacy Policy',
                    click: function() {
                        openPrivacyPolicy();
                    }
                }
            ]
        }
    ];

    return template;
}
