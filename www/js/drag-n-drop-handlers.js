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
        var path = evt.originalEvent.dataTransfer.files[i].path;
        if (entry) {
            trackDragAndDrop();
            if (entry.isFile) {
                // If they drop a file in and not a folder, show a message telling them to add the folder. 
                // Could consider trying to use parent folder of the file they dragged in, in the future. 
                displayErrorMessage("Please drag in an existing PhoneGap project folder to add it to your project list. ");
            } else if (entry.isDirectory) {
                // Trigger the open project workflow, which will look for the existence of the config.xml etc
                // and add the project if found 
                global.createClicked = false;
                global.isDragDrop = true;
                openProject(path);                
            }            
        }
    }
}
