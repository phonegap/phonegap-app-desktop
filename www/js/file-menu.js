function initFileMenu() {
    var Menu = require('electron').remote.Menu;
    var MenuItem = require('electron').remote.MenuItem;
    var template = getMenuTemplate();

    var menu = Menu.buildFromTemplate(template);
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
                    accelerator: 'Command+Q',
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
                    accelerator: 'CmdOrCtrl+N',
                    click: function() {
                        $("#createProject").trigger('click');
                    }
                },
                {
                    label: 'Add existing project',
                    accelerator: 'CmdOrCtrl+O',
                    click: function() {
                        $("#openProject").trigger('click');
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    selector: 'selectAll:'
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
