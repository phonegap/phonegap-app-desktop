function displayErrorMessage(msg) {
    alert(msg);
}

function setNotificationText(notificationText) {
    global.jQuery("#notification-text").text(notificationText);
}

function displayNotification() {
    global.jQuery("#notification-bar").addClass("animated slideInUp");
    global.jQuery("#notification-bar").show();       
    global.jQuery("#notification-bar").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        setTimeout(hideNotification, 3000);
    });
}

function hideNotification() {
    global.jQuery("#notification-bar").removeClass("animated slideInUp"); 
    global.jQuery("#notification-bar").addClass("animated fadeOut");    
    global.jQuery("#notification-bar").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", resetNotification);
}

function resetNotification() {
    global.jQuery("#notification-bar").removeClass("animated fadeOut"); 
    global.jQuery("#notification-bar").hide();
}