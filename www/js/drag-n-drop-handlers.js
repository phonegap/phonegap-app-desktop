function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
} 

function handleDrop(e) {  

    e.stopPropagation();
    e.preventDefault();

    var length = e.originalEvent.dataTransfer.items.length;
    for (var i = 0; i < length; i++) {
        var entry = e.originalEvent.dataTransfer.items[i].webkitGetAsEntry();
        if (entry.isFile) {
            console.log("file");
            // TODO: what should we do if a file is dropped in? should we assume the parent folder is the project folder?
        } else if (entry.isDirectory) {
            console.log("folder: " + entry.fullPath);
            global.jQuery('#projectFolder').text("Project Directory: " + entry.fullPath);
            // TODO: set this as the current project folder. should we check if folder contains a valid project & then prompt the user to create
            //       a new project if the folder does not contain a valid project?
        }
    }
}