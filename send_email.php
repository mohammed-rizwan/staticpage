<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "info@realiablepaper.in";  // Your email
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Construct email
    $email_subject = "New Contact Form Submission: $subject";
    $email_body = "
        Name: $name\n
        Email: $email\n
        Phone: $phone\n
        Subject: $subject\n
        Message: \n$message
    ";
    $headers = "From: $email";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "<script>alert('Message sent!'); window.location.href = 'contact.html';</script>";
    } else {
        echo "<script>alert('Failed to send message. Please try again.'); window.location.href = 'contact.html';</script>";
    }
} else {
    header("Location: contact.html");
    exit();
}
?>
