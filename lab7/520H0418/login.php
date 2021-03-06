<?php
session_start();
if (isset($_SESSION['user'])) {
    header(header: "location:home.php");
    die();
}
$user = '';
$pass = '';
$error = '';
if (isset($_POST['user']) && isset($_POST['pass'])) {
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    if (empty($user)) {
        $error = "Please enter your username";
    } else if (empty($pass)) {
        $error = "Please enter your password";
    } else if (strlen($pass) < 5) {
        $error = "Password must have a least 6 chracter";
    } else if ($user !== 'admin' || $pass !== '123456') {
        $error = "invalid username or password";
    } else {
        //login success
        $_SESSION['user'] = $user;
        header("header:location :home.php");
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>

<body>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <h3 class="text-center text-secondary mt-5 mb-3">User Login</h3>
                <form method="post" class="border rounded w-100 mb-5 mx-auto px-3 pt-3 bg-light">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input name="user" value="<?= $user ?>" id="username" type="text" class="form-control"
                            placeholder="Username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input name="pass" value="<?= $pass ?>" id="password" type="password" class="form-control"
                            placeholder="Password">
                    </div>
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="remember">
                        <label class="custom-control-label" for="remember">Remember login</label>
                    </div>
                    <div class="form-group">
                        <?php
                        if (!empty($error)) {
                            echo "<div class='alert alert-danger'>$error</div>";
                        }
                        ?>
                        <button class=" btn btn-success px-5">Login</button>
                    </div>
                    <div class="form-group">
                        <p>Forgot password? <a href="#">Click here</a></p>
                    </div>
                </form>

            </div>
        </div>
    </div>

</body>

</html>