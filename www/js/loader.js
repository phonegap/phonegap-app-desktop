function hideLoader() {
    $("#loading-overlay").hide();
}

function showLoader(shouldFade) {
    // For longer running tasks, show spinner and fade out background until complete
    if (shouldFade) {
        // Style spinner black/white and add helpful text to show what's happening. 
        $("#loading-overlay").css({'opacity':0.8})
        $(".loader").addClass('bw'); 
        $(".loaderText").html("Creating Project...");
        $(".loaderText").css({'display':'block'});       
    }
    else {
        $("#loading-overlay").css({'opacity':1.0});
        $(".loader").removeClass('bw');   
        $(".loaderText").css({'display':'none'});
    }
            
    $("#loading-overlay").show();
}
