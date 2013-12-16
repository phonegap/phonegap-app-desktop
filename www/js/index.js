var fileExplorerPage = require('nw.gui');
var win = fileExplorerPage.Window.get();   

win.show();    

win.on("close", function () {
	console.log("window close handler");
	
	/*
	// only want to call this if the user is logged in to PGB
	global.pg.remote.logout({}, function(e) {
		if (e) {
			console.log(e.message);
			alert(e.message);
		}
	});
	*/
});