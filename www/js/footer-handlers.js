function addProjectOverlay(evt) {
    console.log("addProjectOverlay - plus click handler");
    global.jQuery("#createOpenProjectOverlay").show();
}

function removeProjectOverlay(evt) {
    console.log("removeProjectOverlay");
    // TODO: we should probably prompt the user to confirm that they want to delete the project
    removeProjectWidget();
}