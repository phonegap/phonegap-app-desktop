var fileExplorerPage = require('nw.gui');
var win = fileExplorerPage.Window.get();   

win.show();    

win.on("close", function () {
	console.log("window close handler");
		
	if (global.username) {
		global.pg.remote.logout({}, function(e) {
			if (e) {
				console.log(e.message);
				alert(e.message);
			} else {
				global.username = null;
				global.password = null;
				win.close(true);
			}
		});		
	} else {
		this.close(true);
	}
});
