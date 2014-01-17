var fileExplorerPage = require('nw.gui');
var win = fileExplorerPage.Window.get();   

win.show();    

win.on("close", function () {
	console.log("window close handler");
	this.close(true);	
});
