<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <table border="1" width="100%" style="border-collapse : collapse ; text-align : center">
        <?php
        echo "<h1>Bang Cuu Chuong</h1>";
        for ($i = 1; $i <= 10; $i++) {
            echo "<tr>";
            for ($j = 1; $j <= 10; $j++) {
                $c = $i * $j;
                echo "<td>$i * $j = $c \t</td>";
            }
            echo "</tr>";
        }
        ?>
    </table>
</body>

</html>