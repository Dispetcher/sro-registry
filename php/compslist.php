<?php

$xml = simplexml_load_file("../xml/reestr.xml");

/*Получаем переменную из Ангулара*/
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
$xml_id = (string)$request->id;

foreach ($xml->children() as $key) {
	$companies[] = array('ID_AGENT' => (string)$key->ID_AGENT,
							'MEMBERNAME' => (string)$key->MEMBERNAME,
							'REESTR_NUM' => (integer)$key->REESTR_NUM,
							'AGENTSTATUSE' => (string)$key->STATUS,
							'INN' => (string)$key->INN,
							'OGRN' => (string)$key->OGRN
						);
}

if(!$xml_id){
	print json_encode($companies);
}else{

	$memName = array(); /*выходной массив*/
	$i = 0; /*initial state*/
	foreach($companies as $k => $v){
	
		if($v['ID_AGENT'] == $xml_id){
			$memName = array('MEMBERNAME' => (string)$v['MEMBERNAME']);
		}
	
		$i++;
	}
	print json_encode($memName);
}


?>

