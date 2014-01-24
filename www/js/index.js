var gui = require('nw.gui');
var win = gui.Window.get();   

var menubar = new gui.Menu({ type: 'menubar' });
var file = new gui.Menu();

win.menu = menubar;
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file }), 1);

// TODO: gotta be a better way of adding menu items by index number...
menubar.items[0].submenu.append(new gui.MenuItem({
   	label: 'New',
   	click: function () {
      	alert("test");
   	}
}));

// Create a tray icon
//var tray = new gui.Tray({ title: 'Tray', icon: 'img/icon.png' });
var tray = new gui.Tray({title: 'Tray'});

// Give the tray a menu
var menu = new gui.Menu();
menu.append(new gui.MenuItem({ type: 'normal', label: 'tray test', click: function() { alert("tray menu item test"); } }));
tray.menu = menu;


win.show();    

win.on("close", function () {
	console.log("window close handler");
	this.close(true);	
});
