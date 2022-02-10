<?php

$to = 'kontaktmastersclean@gmail.com';
$name = $_POST['name'];
$email = $_POST['email'];
$subject = 'Nowy email z mastersclean.pl od: ' . $name . ', adres: ' . $email . '';
$message = $_POST['message'];

$headers[] = 'From: ' . $name . ' (' . $email . ') ';
$headers[] = 'Content-Type: text/html; charset=iso-8859-2';

if(mail($to, $subject, $message, implode("\r\n", $headers))) {
    echo header("Location: sent");
} else{
    echo header("Location: notsent");
}

?>