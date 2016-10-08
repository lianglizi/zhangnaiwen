<?php 
	$type = $_GET["type"];

	if($type == "1") {
		//走post
		$user = $_POST["user"];
		$sex = $_POST["sex"];
		$age = $_POST["age"];
		$phone = $_POST["phone"];
		insertDB($user,$sex,$age,$phone);
	} else {
		//走get
		getDB();
	}

	function insertDB($user,$sex,$age,$phone) {
		$mysqli = new mysqli("localhost:3306","root","","namebook");

		if($mysqli->connect_errno) {
			echo "验证";
			var_dump($mysqli->connect_errno);
			die($mysqli->connect_errno);
		}

		$mysqli->query("set names utf8");

		$sql = "INSERT INTO lianxide(user,sex,age,phone) VALUES ('{$user}','{$sex}','{$age}','{$phone}')";

		$result = $mysqli->query($sql);

		echo $result;

		$mysqli->close();
	}

	function getDB() {
		$mysqli = new mysqli("localhost:3306","root","","namebook");
		if($mysqli->connect_errno) {
			echo "验证";
			var_dump($mysqli->connect_errno);
			die($mysqli->connect_errno);
		}
		$mysqli->query("set names utf8");
		$sql = "SELECT * FROM lianxide";
		$result = $mysqli->query($sql);
		$row = $result->fetch_all(MYSQLI_ASSOC);
		$str = json_encode($row);
		echo $str;
		$mysqli->close();
	}
 ?>