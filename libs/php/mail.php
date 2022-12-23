<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$subject = $_POST['subject'];
$email = $_POST['email'];
$message = $_POST['message'];

// Формирование самого письма
$title = "Приём заказов";
$body = "
<h2 style='color: tomato; font-size: 20px; text-decoration: uppercase;'>Новое письмо</h2>
<b>Тема сообщения:</b> $subject<br>
<b>Почта:</b> $email<br><br>
<b>Текст сообщения:</b><br>$message
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = '#############'; // Логин на почте
    $mail->Password   = '#############'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('mail@gmail.com', 'Сайт порфтолио'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('####################');  

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo "<div class='answer'>
        <div class='contact-form__success'>
            <h2>Заявка принята!<br>
                Я свяжусь с&nbsp;Вами в&nbsp;ближайшее время!
            </h2>
        </div>
    </div>";