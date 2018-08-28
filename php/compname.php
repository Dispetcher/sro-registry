<?php

/*Get plugin settings*/
session_start();
$tableName = $_SESSION['table_gen'];
$dbName = $_SESSION['db_name'];

/* Define server and DB*/
define ("DB_HOST", "u345295.mysql.masterhost.ru");
define ("DB_LOGIN", "u345295");
define ("DB_PASS", "unch24aropped");

if(!$dbName){
	$dbName = "u345295_metrotun";
}
define ("DB_NAME", $dbName );

/*Connect ot DB*/
$con = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASS, DB_NAME);

/* Get ID company from Angular app */
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
$sql_id = $request;

if(!$con){
	die("connection failure".mysqli_connect_error());
}

mysqli_set_charset($con, 'utf8');

if(!$tableName){
	$tableName = 'es_metrotunnel_list';
}
$sql = "SELECT `MEMBERNAME` FROM `$tableName` WHERE `ID_AGENT`=$sql_id";

/*Query to database*/
$res = mysqli_query($con, $sql);

$data = array();

/*Add strings to array*/
if($res->num_rows > 0){
	while ($row = $res->fetch_assoc()){
		$row['MEMBERNAME'] = str_replace('"', '', $row['MEMBERNAME']);
		$row_n = array('MEMBERNAME' => $row['MEMBERNAME']);
		$data[] = $row_n;
	}
}

/*Output encoded JSON data*/
print json_encode($data);

?>