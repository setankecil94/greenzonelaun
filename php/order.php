<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","greenzone");

$data2 = json_decode(file_get_contents("php://input"));

$nama = mysqli_real_escape_string($con, $data2->username);
$alamat2 = mysqli_real_escape_string($con, $data2->alamat2);
$paket = mysqli_real_escape_string($con, $data2->paket);
$lat = mysqli_real_escape_string($con, $data2->lat);
$lng = mysqli_real_escape_string($con, $data2->lng);


$sql = "INSERT INTO orderan VALUES ('','".$nama."','".$alamat2."','".$paket."','".$lat."','".$lng."')";

mysqli_query($con, $sql);

mysqli_close($con);
?>  