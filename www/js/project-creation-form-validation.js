function displayPhoneGapProjectInFolderError() {
    $("#projectDetailsOverlay").addClass("project-details-overlay-project-path-error");
    $("#project-path-error-message").text("The chosen folder already contains a PhoneGap project. Please select a different folder.");
    displayProjectPathError();
}

function displayProjectPathError() {
    $("#project-details-path-label").addClass("required");
    $("#project-path-warning-icon").show();
    $("#project-path-error-message").show();
}

function hideProjectPathError() {
    $("#project-details-path-label").removeClass("required");
    $("#project-path-warning-icon").hide();
    $("#project-path-error-message").hide();
}

function displayProjectNameError() {
    $("#project-details-name-label").addClass("required");
    $("#projectName").addClass("required-input project-creation-warning-icon");
    $("#project-name-error-message").text("You must give your new project a name.");
    $("#project-name-warning").show();
    $("#project-name-error-message").show();
}

function hideProjectNameError() {
    $("#project-details-name-label").removeClass("required");
    $("#projectName").removeClass("required-input project-creation-warning-icon");
    $("#project-name-warning").hide();
    $("#project-name-error-message").hide();
}

function displayDuplicateProjectNameError() {
    $("#project-details-name-label").addClass("required");
    $("#projectName").addClass("required-input project-creation-warning-icon");
    $("#project-name-error-message").text("A folder with this name already exists in the selected local path. Please choose a new name or a new local path.");
    $("#project-name-warning").show();
    $("#project-name-error-message").show();
}

function hideDuplicateProjectNameError() {
    hideProjectNameError();
}

function displayProjectIdError() {
    $("#project-details-id-label").addClass("required");
    $("#project-id").addClass("required-input project-creation-warning-icon");
    $("#project-id-warning").show();
    $("#project-id-error-message").show();
}

function hideProjectIdError() {
    $("#project-details-id-label").removeClass("required");
    $("#project-id").removeClass("required-input project-creation-warning-icon");
    $("#project-id-warning").hide();
    $("#project-id-error-message").hide();
}

function adjustProjectCreationFormHeight(isProjectPathEmpty, isProjectNameEmpty) {
    if (isProjectPathEmpty && isProjectNameEmpty) {
        // change project creation dialog height to accommodate for project path & project name
        $("#projectDetailsOverlay").addClass("project-details-overlay-project-path-and-other-error");
    } else {
        if (isProjectPathEmpty) {
            if (!isProjectNameEmpty) {
                // change project creation dialog height to accommodate for project path error only
                $("#projectDetailsOverlay").addClass("project-details-overlay-project-path-error");
            } else {
                // change project creation dialog height to accommodate for project path error & project name error
                $("#projectDetailsOverlay").addClass("project-details-overlay-project-path-and-other-error");
            }
        } else {
            if (isProjectNameEmpty) {
                // change project creation dialog height to accommodate for project path error & project name error
                $("#projectDetailsOverlay").addClass("project-details-overlay-project-name-or-project-id-error");
            }
        }
    }
}

function resetProjectCreationFormHeight() {
    $("#projectDetailsOverlay").removeClass("project-details-overlay-all-errors");
    $("#projectDetailsOverlay").removeClass("project-details-overlay-project-path-error");
    $("#projectDetailsOverlay").removeClass("project-details-overlay-project-path-and-other-error");
    $("#projectDetailsOverlay").removeClass("project-details-overlay-project-name-and-project-id-error");
    $("#projectDetailsOverlay").removeClass("project-details-overlay-project-name-or-project-id-error");
    $("#projectDetailsOverlay").removeClass("project-details-overlay-duplicate-project-name-error");
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
