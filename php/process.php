<?php
/*Получаем переменную*/
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

if($request == 'cp'){
	echo get_option('cToPage');
}else if($request == 'db'){
	echo get_option('dbName');
}

?>