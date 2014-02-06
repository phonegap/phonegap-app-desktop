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
            alert("file");
        } else if (entry.isDirectory) {
            console.log("folder: " + entry.fullPath);
            //alert("folder: " + entry.fullPath);
            global.jQuery('#projectFolder').text("Project Directory: " + entry.fullPath);
        }
    }
}