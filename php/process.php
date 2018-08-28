<?php
require_once('../../../../wp-config.php');

/*Получаем переменную*/
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

if($request == 'cp'){
	echo get_option('c_to_page');
}

$db = get_option('db_name');
$tableGen = get_option('table_gen_name');
$tableDet = get_option('table_det_name');

/* Using session to send vars to another files*/
session_start();
$_SESSION['db_name'] = $db;
$_SESSION['table_gen'] = $tableGen;
$_SESSION['table_det'] = $tableDet;
?>