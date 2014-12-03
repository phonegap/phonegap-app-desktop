function displayPhoneGapProjectInFolderError() {
    global.jQuery("#newProjectOverlay").addClass("new-project-overlay-project-path-error");
    global.jQuery("#project-path-error-message").text("The chosen folder already contains a PhoneGap project. Please select a different folder.");
    displayProjectPathError();
}

function displayProjectPathError() {
    global.jQuery("#new-project-path-label").addClass("required"); 
    global.jQuery("#project-path-warning-icon").show();
    global.jQuery("#project-path-error-message").show();
}

function hideProjectPathError() {
    global.jQuery("#new-project-path-label").removeClass("required");
    global.jQuery("#project-path-warning-icon").hide();
    global.jQuery("#project-path-error-message").hide();
}

function displayProjectNameError() {
    global.jQuery("#new-project-name-label").addClass("required");
    global.jQuery("#projectName").addClass("required-input project-creation-warning-icon");    
    global.jQuery("#project-name-error-message").text("You must give your new project a name.");
    global.jQuery("#project-name-warning").show();
    global.jQuery("#project-name-error-message").show();
}

function hideProjectNameError() {
    global.jQuery("#new-project-name-label").removeClass("required");
    global.jQuery("#projectName").removeClass("required-input project-creation-warning-icon");
    global.jQuery("#project-name-warning").hide();
    global.jQuery("#project-name-error-message").hide();
}

function displayDuplicateProjectNameError() {
    global.jQuery("#new-project-name-label").addClass("required");
    global.jQuery("#projectName").addClass("required-input project-creation-warning-icon");    
    global.jQuery("#project-name-error-message").text("A folder with this name already exists in the selected local path. Please choose a new name or a new local path.");
    global.jQuery("#project-name-warning").show();
    global.jQuery("#project-name-error-message").show();    
}

function hideDuplicateProjectNameError() {
    hideProjectNameError();
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

function adjustProjectCreationFormHeight(isProjectPathEmpty, isProjectNameEmpty) {
    if (isProjectPathEmpty && isProjectNameEmpty) {
        // change project creation dialog height to accommodate for project path & project name
        global.jQuery("#newProjectOverlay").addClass("new-project-overlay-project-path-and-other-error");
    } else {
        if (isProjectPathEmpty) {
            if (!isProjectNameEmpty) {
                // change project creation dialog height to accommodate for project path error only
                global.jQuery("#newProjectOverlay").addClass("new-project-overlay-project-path-error");
            } else {
                // change project creation dialog height to accommodate for project path error & project name error
                global.jQuery("#newProjectOverlay").addClass("new-project-overlay-project-path-and-other-error");
            }
        } else {
            if (isProjectNameEmpty) {
                // change project creation dialog height to accommodate for project path error & project name error
                global.jQuery("#newProjectOverlay").addClass("new-project-overlay-project-name-or-project-id-error");
            }          
        }
    }     
}

function resetProjectCreationFormHeight() {
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-all-errors");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-path-error");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-path-and-other-error");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-name-and-project-id-error");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-name-or-project-id-error");
    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-duplicate-project-name-error");     
}

function resetProjectCreationForm() {
    global.jQuery("#projectName").val("");
    global.jQuery("#project-id").val("");
    global.jQuery("#projectDirectory").val("");
    global.jQuery("#projectPath").addClass("overlay-form-item-description");
    global.jQuery("#projectPath").addClass("italics");
    global.jQuery("#projectPath").text("Please choose a local path");
    resetProjectCreationFormHeight();
}