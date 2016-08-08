function hideLoader() {
    $("#loading-overlay").hide();
}

function showLoader(shouldFade) {
    // For longer running tasks, show spinner and fade out UI until complete
    if (shouldFade)
        $("#loading-overlay").css({'opacity':0.2})    
    $("#loading-overlay").show();
}
