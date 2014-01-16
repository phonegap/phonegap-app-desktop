function enableFormButtons() {
    if (global.projDir != "") {
        global.jQuery("#createProject").prop("disabled", false);
        global.jQuery("#openProject").prop("disabled", false);
        global.jQuery("#serveProject").prop("disabled", false);
    }    
}

function disableFormButtons() {
    global.jQuery("#createProject").prop("disabled", true);
    global.jQuery("#openProject").prop("disabled", true);
    global.jQuery("#serveProject").prop("disabled", true);
    global.jQuery("#stopServer").prop("disabled", true);   
}

function setButtonLabels() {
    global.jQuery("#createProject").html("create a new project");
    global.jQuery("#openProject").html("open a project");    
    global.jQuery("#serveProject").html("serve a project"); 
    global.jQuery("#stopServer").html("stop server"); 
}

function initGUI() {
    setButtonLabels();
    disableFormButtons();    
    global.jQuery("#projectDirectoryHolder").hide();
}