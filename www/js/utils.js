function isEmptyField(value) {
    var isEmpty = true;
    
    if (value){
        if (value.length > 0) {
            isEmpty = false;
        }        
    }
       
    return isEmpty;
}