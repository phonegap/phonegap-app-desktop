function openDBConnection() {
    window.indexedDB = window.webkitIndexedDB;
    
    if (!window.indexedDB) {
        console.log("indexedDB not supported");
    } else {
        var request = window.indexedDB.open("projects", 3);
        
        request.onerror = function(evt) {
            console.log(evt.target.message);
        };
        
        request.onsuccess = function(evt) {
            console.log("projects database opened successfully");
        };
    }
}