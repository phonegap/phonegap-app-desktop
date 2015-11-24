function displayErrorMessage(msg) {
    alert(msg);
}

function setNotificationText(notificationText) {
    $("#notification-text").text(notificationText);
}

function displayNotification() {
    $("#notification-bar").addClass("animated slideInUp");
    $("#notification-bar").show();
    $("#notification-bar").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        setTimeout(hideNotification, 3000);
    });
}

function hideNotification() {
    $("#notification-bar").removeClass("animated slideInUp");
    $("#notification-bar").addClass("animated fadeOut");
    $("#notification-bar").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", resetNotification);
}

function resetNotification() {
    $("#notification-bar").removeClass("animated fadeOut");
    $("#notification-bar").hide();
}
