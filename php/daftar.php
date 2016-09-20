<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","greenzone");

$data = json_decode(file_get_contents("php://input"));
$nama = mysqli_real_escape_string($con, $data->nama);
$username = mysqli_real_escape_string($con, $data->username);
$pass = mysqli_real_escape_string($con, $data->pass);
$alamat = mysqli_real_escape_string($con, $data->alamat);
$nohp = mysqli_real_escape_string($con, $data->nohp);
$email = mysqli_real_escape_string($con, $data->email);
$level = "0";
  

$sql = "INSERT INTO user VALUES ('','".$nama."','".$username."','".$pass."','".$alamat."','".$nohp."','".$email."','".$level."')";

mysqli_query($con, $sql);
mysqli_close($conn);
?>