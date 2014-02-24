function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
} 

function handleDrop(evt) {  

    evt.stopPropagation();
    evt.preventDefault();

    var length = evt.originalEvent.dataTransfer.items.length;
    for (var i = 0; i < length; i++) {
        var entry = evt.originalEvent.dataTransfer.items[i].webkitGetAsEntry();
        if (entry.isFile) {
            console.log("file");
            // if user drags a file, put them into the normal add / open project workflow
            addProjectOverlay(evt);
        } else if (entry.isDirectory) {
            console.log("folder: " + entry.fullPath);
            // prompt user into normal add / open project workflow - we may want to consider automatically adding the folder as a project but we would
            // need to add logic to determine if the folder contains a valid project. (validProject) ? openExisting : createNew
            addProjectOverlay(evt);
        }
    }
}