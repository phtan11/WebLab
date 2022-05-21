var imageIndex = 0;
let imageList = document.getElementById("imageList");
let size = imageList.options.length;


function selectImage(){
    let imageView = document.getElementById("imageView");
    let url = 'images/' + imageList.value;
    imageView.setAttribute("src", url);


    let index = imageList.selectedIndex +1 ;
    let size = imageList.options.length;
    let pTag = document.getElementsByTagName("p")[0];

    imageIndex = index-1;
    pTag.innerHTML = imageList.value+'(' + index + '/' + size + ')';
}


function previousImage(){
    imageIndex --;
    if(imageIndex === -1){ // la dang mun back ve cuoi cua hinh
        imageIndex = size - 1;
    }
    let imageName = imageList.options[imageIndex].value;
    console.log(imageName);
}
function nextImage(){
    imageIndex ++;
    if(imageIndex === size){
        imageIndex = 0;
    }
    let imageName = imageList.options[imageIndex].value;
    console.log(imageName);
}