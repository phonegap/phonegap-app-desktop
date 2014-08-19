function displayProjectPathError() {
    global.jQuery("#new-project-path-label").addClass("required");
    global.jQuery("#project-path-error-message").show();
}

function hideProjectPathError() {
    global.jQuery("#new-project-path-label").removeClass("required");
    global.jQuery("#project-path-error-message").hide();
}

function displayProjectNameError() {
    global.jQuery("#new-project-name-label").addClass("required");
    global.jQuery("#projectName").addClass("required-input project-creation-warning-icon");
    global.jQuery("#project-name-warning").show();
    global.jQuery("#project-name-error-message").show();
}

function hideProjectNameError() {
    global.jQuery("#new-project-name-label").removeClass("required");
    global.jQuery("#projectName").removeClass("required-input project-creation-warning-icon");
    global.jQuery("#project-name-warning").hide();
    global.jQuery("#project-name-error-message").hide();
}

function displayProjectIdError() {
    global.jQuery("#new-project-id-label").addClass("required");
    global.jQuery("#project-id").addClass("required-input project-creation-warning-icon");
    global.jQuery("#project-id-warning").show();
    global.jQuery("#project-id-error-message").show();    
}

function hideProjectIdError() {
    global.jQuery("#new-project-id-label").removeClass("required");
    global.jQuery("#project-id").removeClass("required-input project-creation-warning-icon");
    global.jQuery("#project-id-warning").hide();
    global.jQuery("#project-id-error-message").hide();
}

function resetProjectCreationForm() {
    global.jQuery("#projectName").val("");
    global.jQuery("#project-id").val("");
    global.jQuery("#projectPath").addClass("overlay-form-item-description");
    global.jQuery("#projectPath").addClass("italics");
    global.jQuery("#projectPath").text("Please choose a local path");
}