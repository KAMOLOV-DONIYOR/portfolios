<?php
// Sana va vaqt
$date = date("Y-m-d H:i:s");

// Foydalanuvchi yuborgan matn
$message = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $message = htmlspecialchars($_POST["matn"]);
}
?>
<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <title>Mening PHP sahifam</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        input[type="text"] {
            padding: 8px;
            width: 80%;
        }
        button {
            padding: 8px 16px;
            background: #007BFF;
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 6px;
        }
        button:hover {
            background: #0056b3;
        }
        .msg {
            margin-top: 15px;
            padding: 10px;
            background: #e6ffe6;
            border: 1px solid #00cc66;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>PHP saytga xush kelibsiz!</h1>
        <p>Bugungi sana va vaqt: <b><?php echo $date; ?></b></p>

        <form method="POST">
            <input type="text" name="matn" placeholder="Matn kiriting..." required>
            <button type="submit">Yuborish</button>
        </form>

        <?php if ($message): ?>
            <div class="msg">
                Siz yubordingiz: <b><?php echo $message; ?></b>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
