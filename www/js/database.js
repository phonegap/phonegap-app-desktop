function openDBConnection() {
    window.indexedDB = window.webkitIndexedDB;
    
    if (!window.indexedDB) {
        console.log("indexedDB not supported");
    } else {
        var request = window.indexedDB.open("projectsDB", 6);
        
        request.onerror = function(evt) {
            console.log(evt.target.message);
        };
        
        request.onupgradeneeded = function(evt) {
            console.log("on upgrade needed");
            
            global.db = evt.target.result;
            
            if (global.db.objectStoreNames.contains("projectsStore")) {
                global.db.deleteObjectStore("projectsStore");
            }
            
            var objStore = global.db.createObjectStore("projectsStore", { keyPath: "id", autoIncrement: true });
        };
        
        request.onsuccess = function(evt) {
            console.log("projects database opened successfully");
            global.db = evt.target.result; 
                
        };
    }
}

function addProject(projectName, projectVersion, iconPath) {
    console.log("addProject called");
    //var trans = global.db.transaction(["projectsStore"], "readwrite");
    //var store = trans.objectStore("projectsStore");

    var projectObj = {"name":projectName, "version":projectVersion, "iconPath":iconPath};

    console.log("projectObj:" + JSON.stringify(projectObj));
   
    // insert into database
    // TODO: should we add error checking to make sure the same project isn't added to the db twice?
    //var request = store.put(projectObj);     
    var request = global.db.transaction(["projectsStore"], "readwrite").objectStore("projectsStore").put(projectObj);

    request.onsuccess = function(evt) {
        console.log("addProject success");
    }

    request.onerror = function(evt) {
        console.log("addProject error");
    }
    
};
