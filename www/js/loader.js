function hideLoader() {
    $("#loading-overlay").hide();
}

function showLoader(shouldFade) {
    // For longer running tasks, show spinner and fade out background until complete
    if (shouldFade) {
        // Style spinner black/white and add helpful text to show what's happening. 
        /*$("#loading-overlay").css({'background-color':'rgba(0, 0, 0, 0.85)'})*/
        $("#loading-overlay-sidebar").addClass('dark');
        $("#loading-overlay-content").addClass('dark');
        $(".loader").addClass('bw'); 
        $(".loaderText").html("Creating Project...");
        $(".loaderText").css({'display':'block'});       
    }
    else {
       /* $("#loading-overlay").css({'background-color':'rgb(204, 204, 204)'})*/
        $("#loading-overlay-sidebar").removeClass('dark');
        $("#loading-overlay-content").removeClass('dark');
        $(".loader").removeClass('bw');   
        $(".loaderText").css({'display':'none'});
    }
            
    $("#loading-overlay").show();
}
