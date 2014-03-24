function setData(key, data) {
    localStorage.setItem(key, data);
}

function getData(key) {
    return localStorage.getItem(key);
}

function generateId() {
    var id = new Date().getTime();
    return id;
}

function addProject(projName, projVersion, iconPath, projDir) {
    var id = generateId();
    setData(id, projDir);
    
    addProjectWidget(id, projName, projVersion, iconPath, projDir);
    setActiveWidget(id, projDir);
}