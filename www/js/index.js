var gui = require('nw.gui');
var win = gui.Window.get();   

// load file system module
var fs = require("fs");
var gaze = require("gaze");
var opener = require('opener');

var menubar = new gui.Menu({ type: 'menubar' });
var file = new gui.Menu();

win.setResizable(false);

win.menu = menubar;
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file }), 1);

// TODO: gotta be a better way of adding menu items by index number...
menubar.items[0].submenu.append(new gui.MenuItem({
   	label: "New Project",
   	click: function () {
		console.log("new project from menubar");
		resetMinusButtonState();
		// create a new project
        animateAddNewProjectOverlayEntry();
   	}
}));
menubar.items[0].submenu.append(new gui.MenuItem({
   	label: "Open Project",
   	click: function () {
      	console.log("open project from menubar");
      	resetMinusButtonState();
		// open an existing project
		openProject();
   	}
}));

var help = new gui.Menu();
win.menu.append(new gui.MenuItem({ label: 'Help', submenu: help }));

menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	label: "Tutorials",
   	click: function () {
   	    gui.Shell.openExternal("https://github.com/hermwong/phonegap-gui/wiki/PhoneGap-GUI-Overview");    // opens user's default browser & loads page
   	}
}));

menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	label: "Report Issue",
   	click: function () {
   	    gui.Shell.openExternal("https://github.com/hermwong/phonegap-gui/issues?state=open");    // opens user's default browser & loads page
   	}
}));

win.show();    

win.on("close", function () {
	console.log("window close handler");
	
	toggleServerStatus();
	
	this.close(true);	
});
