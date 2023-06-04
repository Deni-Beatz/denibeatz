<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Process payment here

    // Send email to customer
    $to = $_POST['email'];
    $subject = 'Thank you for your payment';
    $message = 'Dear ' . $_POST['name'] . ',<br><br>Thank you for your payment!<br><br>Sincerely,<br>My Company';
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: My Company <noreply@mycompany.com>" . "\r\n";
    mail($to,$subject,$message,$headers);

    // Send email to company
    $to = 'businessfordenibeatz@gmail.com';
    $subject = 'New payment received';
    $message = 'A new payment has been received from ' . $_POST['name'] . ' (' . $_POST['email'] . ')';
    $headers = "$headers = "From: Deni Beatz <noreply@denibeatz.com>" . "\r\n";
    mail($to,$subject,$message,$headers);
}
?>