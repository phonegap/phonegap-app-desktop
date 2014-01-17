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
    global.jQuery("#settings").html("settings");
}

function initGUI() {
    setButtonLabels();
    disableFormButtons();    
    global.jQuery("#projectDirectoryHolder").hide();
    hideOverlays();
}

function hideOverlays() {
    global.jQuery("#overlay-bg").hide();
    initAlertOverlay();
    initSettingsOverlay();
}

function initAlertOverlay() {
    global.jQuery("#alertOk").html("ok");
    global.jQuery("#alertOverlay").hide();
}

function alertOverlay(message) {
    global.jQuery("#alertContent").text(message);
    global.jQuery("#alertOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function initSettingsOverlay() {
    global.jQuery("#settingsCancel").html("cancel");
    global.jQuery("#settingsSave").html("save");
    global.jQuery("#settingsOverlay").hide();
}

function settingsOverlay() {
    global.jQuery("#settingsOverlay").show();
    global.jQuery("#overlay-bg").show();
}