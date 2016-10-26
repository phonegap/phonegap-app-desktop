

function getTemplates() {
    var templates = require("./js/template-list");
    addTemplates(templates);
}

function templateWidget(name, npm, description) {
    var str = "<div class='template-widget'>";
    str += "<div class='template-list-item'><input type='radio' data-key='" + npm + "' name='selectedTemplate'> " + name + "</div>";
    str += "<div class='template-list-item-description overlay-form-item-description'>" + description + "</div>";
    str +="</div>";
    return str;
}

function addTemplates(templates) {
    templates.forEach(function(template) {
        var templateDOM = templateWidget(template.name, template.npm, template.desc);
        $("#templateList").append(templateDOM);
    });
    // select first one
    $("input[name='selectedTemplate']").eq(0).prop('checked','checked');
}
