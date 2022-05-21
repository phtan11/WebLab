function showError(message) {
    let error = document.getElementsByClassName('errorMessage')[0];
    if(message == null || message == undefined){
        //hide error
        if(!error.classList.contains('d-none')){
            error.classList.add('d-none');
        }
    }
    else{
        error.classList.remove('d-none');
        error.innerHTML = message;
    }

}
function validateInput(){
    let emailField  = document.getElementById('email');
    let passwordField  = document.getElementById('pwd');
    
    let email = emailField.value;
    let pass = passwordField.value;

    if (email == ''){
        showError('Please enter your email');
        return false;
    }
    if(!email.includes('@')){
        showError('Your email is not correct');
        return false;
    }
    if (pass == ''){
        showError('Please enter your password');   
        return false;
    }
    if(passwordField.value.length < 6){
        showError('Your password must contain at least 6 characters');
        return false;
    }
    showError(null); //undefined
    return true;
}