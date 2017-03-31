function displayPhoneGapProjectInFolderError() {
    $("#project-path-error-message").text("The chosen folder already contains a PhoneGap project. Please select a different folder.");
    $("#new-project-path-label").addClass("required");
    $("#project-path-warning-icon").show();
    $("#project-path-error-message").show();
    adjustProjectCreationFormHeight();
}

function displayProjectPathError() {
    $("#project-path-error-message").text("You must choose a local path where your project will be created.");
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

function adjustProjectCreationFormHeight() {
    var confirmHeight = $("#addNewProject").position().top;
    $("#projectDetailsOverlay").height(confirmHeight + 49);
}

function resetProjectCreationFormHeight() {
    $("#projectDetailsOverlay").css("height", "");
}

function resetProjectCreationForm() {
    $("#projectName").val("");
    $("#project-id").val("");
    $("#projectDirectory").val("");
    $("#projectPath").addClass("overlay-form-item-description");
    $("#projectPath").addClass("italics");
    //$("#projectPath").text("Please choose a local path");
    $("#projectPath").text(getLastSelectedProjectPath());
    $(".tooltiptext").text(getLastSelectedProjectPath());
    resetProjectCreationFormHeight();
}
