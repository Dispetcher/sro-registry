<?php 

$xml = simplexml_load_file("../xml/details.xml");

/*Получаем переменную из Ангулара*/
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
$xml_id = (string)$request->id;


foreach ($xml->children() as $key) {
	$details[] = array('ID_AGENT' => (integer)$key->agent_id,
						'COLNAME' => (string)$key->colname,
						'COLVALUE' => (string)$key->colvalue);
}
$data = array(); /*выходной массив*/
$i = 0; /*initial state*/
$keys = array(); /*порядок ключей, нужные для отображения*/
foreach($details as $k => $v){
	
	if($v['ID_AGENT'] == $xml_id){
		array_push($keys, $i);
	}
	
	$i++;
}

foreach($keys as $k => $v){

	array_push($data, $details[$v]);

}

print json_encode($data);
?>