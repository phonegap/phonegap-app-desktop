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
            global.jQuery('#projectFolder').text("Project Directory: " + entry.fullPath);
            // TODO: set this as the current project folder. should we check if folder contains a valid project & then prompt the user to create
            //       a new project if the folder does not contain a valid project?
        }
    }
}