<?php   

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","greenzone");

$id = $_GET['id'];

$sql = "SELECT * FROM orderan WHERE id = '".$id."'";

$result = mysqli_query($con, $sql);

while ($row = mysqli_fetch_assoc($result)) {

	$output = $row;

}

echo json_encode($output)

?>