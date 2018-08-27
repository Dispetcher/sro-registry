<?php

/* Define server and DB*/
define ("DB_HOST", "u345295.mysql.masterhost.ru");
define ("DB_LOGIN", "u345295");
define ("DB_PASS", "unch24aropped");
define ("DB_NAME", "u345295_metrotun");

/*Connect ot DB*/
$con = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASS, DB_NAME);

if(!$con){
	die("connection failure".mysqli_connect_error());
}

mysqli_set_charset($con, 'utf8');

$sql = "SELECT `ID_AGENT`, `MEMBERNAME`, `REESTR_NUM`, `INN`, `OGRN`, `AGENTSTATUSE` FROM `es_metrotunnel_list` ORDER BY `REESTR_NUM`";

/*Query to database*/
$res = mysqli_query($con, $sql);

$data = array();

/*Add strings to array*/
if($res->num_rows > 0){
	while ($row = $res->fetch_assoc()){
		$row['MEMBERNAME'] = str_replace('"', '', $row['MEMBERNAME']); /* Remove extra quotes*/
		$row_n = array('ID_AGENT' => $row['ID_AGENT'] ,
		'MEMBERNAME' => $row['MEMBERNAME'],
		'REESTR_NUM' => (integer)$row['REESTR_NUM'],
		'INN' => $row['INN'],
		'OGRN' => $row['OGRN'],
		'AGENTSTATUSE' => $row['AGENTSTATUSE']);
		$data[] = $row_n;
	}
}

/*Output encoded JSON data*/
print json_encode($data);

?>