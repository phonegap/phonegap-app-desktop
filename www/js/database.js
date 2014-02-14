function openDBConnection() {
    window.indexedDB = window.webkitIndexedDB;
    
    if (!window.indexedDB) {
        console.log("indexedDB not supported");
    } else {
        var request = window.indexedDB.open("projectsDB", 3);
        
        request.onerror = function(evt) {
            console.log(evt.target.message);
        };
        
        request.onupgradeneeded = function(evt) {
            var db = evt.target.result;
            var objStore = db.createObjectStore("projectsStore", { autoincrement: true});
        };
        
        request.onsuccess = function(evt) {
            console.log("projects database opened successfully");
            global.db = evt.target.result; 
            
            global.db.addProject = function(projectObj) {
                console.log("addProject called");
                //var trans = global.db.transaction(["projectsStore"], "readwrite");
                //var store = trans.objectStore("projectsStore");

                console.log("projectObj:" + JSON.stringify(projectObj));

                /*
                // insert into database
                // TODO: should we add error checking to make sure the same project isn't added to the db twice?
                var request = store.put(projectObj);

                request.onsuccess = function(evt) {
                    console.log("addProject success");
                }

                request.onerror = function(evt) {
                    console.log("addProject error");
                }
                */
            };           
        };
    }
}


