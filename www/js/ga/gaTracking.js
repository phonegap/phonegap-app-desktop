function gaAppLoaded() {
    if (global.debugMode && getSendUsageFlag()) {
        ga_storage._trackPageview('/index', 'pg-desktop loaded');
    }
}
