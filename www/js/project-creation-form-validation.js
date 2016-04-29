function displayPhoneGapProjectInFolderError() {
    $("#newProjectOverlay").addClass("new-project-overlay-project-path-error");
    $("#project-path-error-message").text("The chosen folder already contains a PhoneGap project. Please select a different folder.");
    $("#new-project-path-label").addClass("required");
    $("#project-path-warning-icon").show();
    $("#project-path-error-message").show();
}

function displayProjectPathError() {
    $("#project-path-error-message").text("You must choose a local path where your project will be created.");
    $("#new-project-path-label").addClass("required");
    $("#project-path-warning-icon").show();
    $("#project-path-error-message").show();
}

function hideProjectPathError() {
    $("#new-project-path-label").removeClass("required");
    $("#project-path-warning-icon").hide();
    $("#project-path-error-message").hide();
}

function displayProjectNameError() {
    $("#new-project-name-label").addClass("required");
    $("#projectName").addClass("required-input project-creation-warning-icon");
    $("#project-name-error-message").text("You must give your new project a name.");
    $("#project-name-warning").show();
    $("#project-name-error-message").show();
}

function hideProjectNameError() {
    $("#new-project-name-label").removeClass("required");
    $("#projectName").removeClass("required-input project-creation-warning-icon");
    $("#project-name-warning").hide();
    $("#project-name-error-message").hide();
}

function displayDuplicateProjectNameError() {
    $("#new-project-name-label").addClass("required");
    $("#projectName").addClass("required-input project-creation-warning-icon");
    $("#project-name-error-message").text("A folder with this name already exists in the selected local path. Please choose a new name or a new local path.");
    $("#project-name-warning").show();
    $("#project-name-error-message").show();
}

function hideDuplicateProjectNameError() {
    hideProjectNameError();
}

function displayProjectIdError() {
    $("#new-project-id-label").addClass("required");
    $("#project-id").addClass("required-input project-creation-warning-icon");
    $("#project-id-warning").show();
    $("#project-id-error-message").show();
}

function hideProjectIdError() {
    $("#new-project-id-label").removeClass("required");
    $("#project-id").removeClass("required-input project-creation-warning-icon");
    $("#project-id-warning").hide();
    $("#project-id-error-message").hide();
}

function adjustProjectCreationFormHeight(isProjectPathEmpty, isProjectNameEmpty) {
    if (isProjectPathEmpty && isProjectNameEmpty) {
        // change project creation dialog height to accommodate for project path & project name
        $("#newProjectOverlay").addClass("new-project-overlay-project-path-and-other-error");
    } else {
        if (isProjectPathEmpty) {
            if (!isProjectNameEmpty) {
                // change project creation dialog height to accommodate for project path error only
                $("#newProjectOverlay").addClass("new-project-overlay-project-path-error");
            } else {
                // change project creation dialog height to accommodate for project path error & project name error
                $("#newProjectOverlay").addClass("new-project-overlay-project-path-and-other-error");
            }
        } else {
            if (isProjectNameEmpty) {
                // change project creation dialog height to accommodate for project path error & project name error
                $("#newProjectOverlay").addClass("new-project-overlay-project-name-or-project-id-error");
            }
        }
    }
}

function resetProjectCreationFormHeight() {
    $("#newProjectOverlay").removeClass("new-project-overlay-all-errors");
    $("#newProjectOverlay").removeClass("new-project-overlay-project-path-error");
    $("#newProjectOverlay").removeClass("new-project-overlay-project-path-and-other-error");
    $("#newProjectOverlay").removeClass("new-project-overlay-project-name-and-project-id-error");
    $("#newProjectOverlay").removeClass("new-project-overlay-project-name-or-project-id-error");
    $("#newProjectOverlay").removeClass("new-project-overlay-duplicate-project-name-error");
}

function resetProjectCreationForm() {
    $("#projectName").val("");
    $("#project-id").val("");
    $("#projectDirectory").val("");
    $("#projectPath").addClass("overlay-form-item-description");
    $("#projectPath").addClass("italics");
    $("#projectPath").text("Please choose a local path");
    resetProjectCreationFormHeight();
}
