function addStudent(){
    let firstNameField = document.getElementById("firstname");
    let lastNameField = document.getElementById("lastname");
    let emailField = document.getElementById("email");

    let firstName = firstNameField.value;
    let lastName = lastNameField.value;
    let email = emailField.value;

    //create element cho first name, last , email
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2= document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    // add td1,2,3,4 in tr (parent)
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    td1.innerHTML = firstName;
    td2.innerHTML = lastName;
    td3.innerHTML = email;
    td4.innerHTML = '<button onclick= "remove(this)" class="btn btn-danger btn-sm">Delete</button>';

    //add vao phia duoi cua the tbody
    let tbody  = document.getElementsByTagName("tbody")[0];
    tbody.appendChild(tr); 

    //clear first, last name, email ve null
    firstNameField.value = '';
    lastNameField.value = '';
    emailField.value = '';
    
    //focus , sau khi add 1 th thi the pointer tro vao cho do
    firstNameField.focus();
}

function remove(element){ // element la the button
    let td = element.parentElement;
    let tr = td.parentElement;
    tr.remove();
}
