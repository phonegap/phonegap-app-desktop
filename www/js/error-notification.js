function displayErrorMessage(msg) {
    alert(msg);
}

function displayInlineError(control) {
    control.addClass("animatedNotification slideInRight");
    control.show();
    control.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        hideInlineError(control);
    });    
}

function hideInlineError(control) {
    control.removeClass("animatedNotification slideInRight"); 
    control.addClass("animatedFade fadeOut");    
    control.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        resetInlineError(control);
    });    
}

function resetInlineError(control) {
    control.removeClass("animatedFade fadeOut"); 
    control.hide();
}