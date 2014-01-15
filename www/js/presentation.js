function enableFormButtons() {
    if (global.projDir != "") {
        global.jQuery("#createProject").prop("disabled", false);
        global.jQuery("#openProject").prop("disabled", false);
        global.jQuery("#serveProject").prop("disabled", false);
        global.jQuery("#buildProject").prop("disabled", false);
    }    
}

function disableFormButtons() {
    global.jQuery("#createProject").prop("disabled", true);
    global.jQuery("#openProject").prop("disabled", true);
    global.jQuery("#serveProject").prop("disabled", true);
    global.jQuery("#stopServer").prop("disabled", true);
    global.jQuery("#buildProject").prop("disabled", true);    
}

function setButtonLabels() {
    global.jQuery("#createProject").val("create a new project");
    global.jQuery("#openProject").val("open a project");    
    global.jQuery("#serveProject").val("serve a project"); 
    global.jQuery("#stopServer").val("stop server");   
    global.jQuery("#buildProject").val("build a project");   
    global.jQuery("#submit").val("login");
    global.jQuery("#logout").val("log out");
}

function initGUI() {
    setButtonLabels();
    disableFormButtons();
    global.jQuery("#buildHolder").hide();
}