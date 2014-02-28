var gui = require('nw.gui');
var win = gui.Window.get();   

// load file system module
var fs = require("fs");

var menubar = new gui.Menu({ type: 'menubar' });
var file = new gui.Menu();

win.menu = menubar;
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file }), 1);

// TODO: gotta be a better way of adding menu items by index number...
menubar.items[0].submenu.append(new gui.MenuItem({
   	label: "New Project",
   	click: function () {
		console.log("new project from menubar");
      	global.jQuery("#projectDirectory").trigger("click");
   	}
}));
menubar.items[0].submenu.append(new gui.MenuItem({
   	label: "Open Project",
   	click: function () {
      	console.log("open project from menubar");
		global.jQuery("#openProject").trigger("click");
   	}
}));

var help = new gui.Menu();
win.menu.append(new gui.MenuItem({ label: 'Help', submenu: help }));

menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	label: "How to use",
   	click: function () {
   	    alert("not implemented yet");
   	}
}));

/*
// comment out tray code - since tray click is not supported on OSX
// Create a tray icon
//var tray = new gui.Tray({ title: 'Tray', icon: 'img/icon.png' });
var tray = new gui.Tray({title: 'Tray'});

// Give the tray a menu
var menu = new gui.Menu();
menu.append(new gui.MenuItem({ type: 'normal', label: 'tray test', click: function() { alert("tray menu item test"); } }));
tray.menu = menu;

// remove tray when clicked
tray.on('click', function() {
	console.log("tray clicked");
});
*/

win.show();    

win.on("close", function () {
	console.log("window close handler");
	closeDBConnection();
	this.close(true);	
});
