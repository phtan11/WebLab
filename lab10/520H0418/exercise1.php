<?php

session_start();
$error = '';
$success = '';
if (!empty($_SESSION['error'])) {
	$error = $_SESSION['error'];
}
if (!empty($_SESSION['success'])) {
	$success = $_SESSION['success'];
}
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Upload file</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>

<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col col-md-6 card mt-5 p-3">
                <form id="uploadForm" enctype="multipart/form-data" method="post" action="upload.php">

                    <div class="form-group">
                        <label for="name">File Name</label>
                        <input name="fileName" id="name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <div class="custom-file">
                            <input name="myFile" type="file" class="custom-file-input" id="myFile">
                            <label class="custom-file-label" for="document">Choose file</label>
                        </div>
                    </div>
                    <div class="form-froup" style="padding-bottom:10px">
                        <div class=" progress" style="height : 10px;">
                            <div id="progressBar" class="progress-bar bg-success"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary">Upload</button>
                    </div>
                    <div class="form-group">
                        <div id="error"></div>
                        <?php
						if (!empty($error)) {
						?>
                        <div class="alert alert-danger"><?= $error ?></div>
                        <?php
							$_SESSION['error'] = "";
						}
						if (!empty($success)) {
						?>
                        <div class="alert alert-success"><?= $success ?></div>
                        <?php
							$_SESSION['success'] = "";
						}
						?>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
    // Add the following code if you want the name of the file appear on select
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
    let error = document.getElementById('error');
    let input = document.querySelector('#myFile');
    let name = document.querySelector('#name');
    let progressBar = document.getElementById('progressBar');
    let form = document.getElementById('uploadForm');

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (input.files.length === 0) return;
        let fileName = name.value;
        let file = input.files[0];
        let formData = new FormData();
        formData.append('fileName', fileName);
        formData.append('myFile', file);

        let xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', e => {
            let total = e.total;
            let uploaded = e.loaded;
            let progress = uploaded * 100.0 / total;
            let percent = Math.round(progress * 100) / 100;
            progressBar.style.width = percent + '%';
            progress.innerHTML = percent;
        })
        xhr.open('POST', 'upload.php', true);
        xhr.send(formData);
    })

    document.querySelector('#myFile').addEventListener('change', e => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0];

            if (file.size > 2 * 1024 * 1024 * 1024) {
                error.innerText = "You cant not upload file";
            }
        }
    })
    </script>
</body>

</html>