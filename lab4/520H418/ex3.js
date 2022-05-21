function updateText(message) {
    let alert = document.getElementsByClassName("alert-success")[0];
    alert.innerHTML = message;
}
function updateColor(color){
    let alert = document.getElementsByClassName("alert-success")[0];
    alert.style.color  = color;
}
function updateWeight(isbold){
    let alert = document.getElementsByClassName("alert-success")[0];
    // font is true or false(with type checkbox)
    if(isbold){
        alert.style.fontWeight = 'bold';
    }
    else{
        alert.style.fontWeight = 'normal';
    }
}
function updateStyle(isItaly){
    let alert = document.getElementsByClassName("alert-success")[0];
    if(isItaly){
        alert.style.fontStyle = 'italic';
    }
    else{
        alert.style.fontStyle = 'normal';
    }
}
function updateLine(isUnderline){
    let alert = document.getElementsByClassName("alert-success")[0];
    if(isUnderline){
        alert.style.textDecoration = 'underline';
    }
    else{
        alert.style.textDecoration = 'none';
    }
}

function restockDefault(){
    let alert = document.getElementsByClassName("alert-success")[0];
    alert.style.color = 'black';
    alert.style.fontWeight = 'normal';
    alert.style.fontStyle = 'normal';
    alert.style.textDecoration = 'none';
}