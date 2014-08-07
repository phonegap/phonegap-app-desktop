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

function displayErrorFromTop(control) {
    control.addClass("animated slideInDown");
    control.show();
    control.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        //hideErrorFromTop(control);
    });    
}

function hideErrorFromTop(control) {
    control.removeClass("animated slideInDown"); 
    control.addClass("animated slideOutUp");    
    control.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        resetErrorFromTop(control);
    });    
}

function resetErrorFromTop(control) {
    control.removeClass("animated slideOutUp"); 
    control.hide();
}