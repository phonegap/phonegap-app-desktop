function gaAppLoaded() {
    if (getDebugFlag() && getSendUsageFlag()) {
        ga_storage._trackPageview('/index', 'pg-desktop loaded');
    }
}
