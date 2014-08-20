function displayProjectPathError() {
    global.jQuery("#new-project-path-label").addClass("required");
    global.jQuery("#project-path-warning-icon").show();
    global.jQuery("#project-path-error-message").show();
    global.projectPathErrorDisplayed = true;
}

function hideProjectPathError() {
    global.jQuery("#new-project-path-label").removeClass("required");
    global.jQuery("#project-path-warning-icon").hide();
    global.jQuery("#project-path-error-message").hide();
    global.projectPathErrorDisplayed = false;
}

function displayProjectNameError() {
    global.jQuery("#new-project-name-label").addClass("required");
    global.jQuery("#projectName").addClass("required-input project-creation-warning-icon");
    global.jQuery("#project-name-warning").show();
    global.jQuery("#project-name-error-message").show();
    global.projectNameErrorDisplayed = true;
}

function hideProjectNameError() {
    global.jQuery("#new-project-name-label").removeClass("required");
    global.jQuery("#projectName").removeClass("required-input project-creation-warning-icon");
    global.jQuery("#project-name-warning").hide();
    global.jQuery("#project-name-error-message").hide();
    global.projectNameErrorDisplayed = false;
}

function displayProjectIdError() {
    global.jQuery("#new-project-id-label").addClass("required");
    global.jQuery("#project-id").addClass("required-input project-creation-warning-icon");
    global.jQuery("#project-id-warning").show();
    global.jQuery("#project-id-error-message").show();
    global.projectIdErrorDisplayed = true;   
}

function hideProjectIdError() {
    global.jQuery("#new-project-id-label").removeClass("required");
    global.jQuery("#project-id").removeClass("required-input project-creation-warning-icon");
    global.jQuery("#project-id-warning").hide();
    global.jQuery("#project-id-error-message").hide();
    global.projectIdErrorDisplayed = false;
}

function resetProjectCreationFormHeight() {
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-all-errors");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-path-error");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-path-and-other-error");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-name-and-project-id-error");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-name-or-project-id-error");    
}

function resetProjectCreationForm() {
    global.jQuery("#projectName").val("");
    global.jQuery("#project-id").val("");
    global.jQuery("#projectPath").addClass("overlay-form-item-description");
    global.jQuery("#projectPath").addClass("italics");
    global.jQuery("#projectPath").text("Please choose a local path");
    resetProjectCreationFormHeight();
}