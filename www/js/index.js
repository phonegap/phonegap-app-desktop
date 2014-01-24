var gui = require('nw.gui');
var win = gui.Window.get();   

var menubar = new gui.Menu({ type: 'menubar' });
var file = new gui.Menu();

win.menu = menubar;
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file }), 1);


menubar.items[0].submenu.append(new gui.MenuItem({
   label: 'New',
   click: function () {
      alert("test");
   }
}));


win.show();    

win.on("close", function () {
	console.log("window close handler");
	this.close(true);	
});
