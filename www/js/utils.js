function isEmptyField(value) {
    var isEmpty = true;
    
    if (value){
        if (value.length > 0) {
            isEmpty = false;
        }        
    }
       
    return isEmpty;
}

function isProjectPathFieldEmpty(value) {
    var isEmpty = true;
    var prompt = "Please choose a local path";
    
    if (value != prompt) {
        isEmpty = false;
    }
    
    return isEmpty;
}