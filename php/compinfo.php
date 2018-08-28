<?php

/*Get plugin settings*/
include 'process.php';
$tableName = $tableDet;

/* Define server and DB*/
define ("DB_HOST", "u345295.mysql.masterhost.ru");
define ("DB_LOGIN", "u345295");
define ("DB_PASS", "unch24aropped");
define ("DB_NAME", "u345295_metrotun");

/*Connect ot DB*/
$con = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASS, DB_NAME);

/* Get ID company from Angular app*/
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
$sql_id = $request;

if(!$con){
	die("connection failure".mysqli_connect_error());
}

mysqli_set_charset($con, 'utf8');

if(!$tableName){
	$tableName = 'es_metrotunnel_details';
}

//$sql = "SELECT `COLNAME`, `COLVALUE` FROM `es_metrotunnel_details` WHERE `id_agent` = $sql_id";
$sql = "SELECT `COLNAME`, `COLVALUE` FROM `$tableName` WHERE `id_agent` = $sql_id";


/*Query to database*/
$res = mysqli_query($con, $sql);

/*Get data type*/
$data = array();

$c = 0;
$cn = 9999;

/*Add strings to array*/
if($res->num_rows > 0){
	while ($row = $res->fetch_assoc()){
		$data[] = $row;

	/* Adding headers into array blocks*/	
 	if($c == 1){
		$row = array('COLNAME'=>'Сведения, позволяющие идентифицировать члена СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 6){
		$row = array('COLNAME'=>'Адрес', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 8){
		$row = array('COLNAME'=>'Контактная информация', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 12){
		$row = array('COLNAME'=>'Руководитель', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 14){
		$row = array('COLNAME'=>'Сведения о соответствии члена СРО условиям членства в СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 15){
		$row = array('COLNAME'=>'Сведения о внесении взноса в Компенсационный фонд возмещения вреда СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 17){
		$row = array('COLNAME'=>'Сведения о внесении взноса в Компенсационный фонд обеспечения договорных обязательств СРО', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 19){
		$row = array('COLNAME'=>'Сведения о наличии страховки', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 26){
		$row = array('COLNAME'=>'Сведения о наличии у члена саморегулируемой организации права выполнять строительство, реконструкцию, капитальный ремонт объектов капитального строительства по договору строительного подряда, заключаемого с использованием конкурентных способов заключения договоров', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 28){
		$row = array('COLNAME'=>'по договору строительного подряда', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 31){
		$row = array('COLNAME'=>'по договору строительного подряда, заключаемого с использованием конкурентных способов заключения договоров', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == 34){
		$row = array('COLNAME'=>'Сведения о внесении изменении в свидетельство о праве', 'COLVALUE'=>'');
		$data[] = $row;
	}else if ($c == $cn){
		$row = array('COLNAME'=>'Ранее выданные свидетельства о допуске/праве', 'COLVALUE'=>'');
		$data[] = $row;
	}
	/***    ***/

	/*** Adding headers - Сведения о приостановлении /// Сведения о исключении
	=========
	***/
	if($row['COLNAME'] == 'Порядковый номер' and $n == 1){
		$n = 0;
	}else if($row['COLNAME'] != 'Порядковый номер' and $n == 1){
		
		$row_tmp = $row;
		$el_arr = array_pop($data);

		$row = array('COLNAME'=>'Сведения о приостановлении, о возобновлении, об отказе в возобновлении права осуществлять строительство, реконструкцию, капитальный ремонт объектов капитального строительства', 'COLVALUE'=>'');
		$data[] = $row;
		$data[] = $row_tmp;

		$row = array('COLNAME'=>'Сведения о прекращении членства в Ассоциации', 'COLVALUE'=>'');
		$data[] = $row;

		/* Service variable - Get position of next header    */
		$cn = $c + 3;
		
		/* Service variable  - For header - Сведения о приостановлении    */
		$n = 0;
	}

	if($row['COLNAME'] == 'Событие, с которым связано внесение изменений'){
		
		/* Service variable  - Сведения о приостановлении  */ 
		$n = 1;
	}
	/***(END OF) First headers block
	=========
	***/

	/***Correcting ВИП проверок on ВИД
	=========
	***/
	if($row['COLNAME'] == 'Вип проверки'){
		$row = array('COLNAME'=>'Вид проверки', 'COLVALUE'=>$row['COLVALUE']);
		$el_arr = array_pop($data);
		$data[] = $row;
	}
	/*** (END OF) Correcting ВИП проверок on ВИД
	=========
	***/

	/*** Last header
	=========
	***/

	if($row['COLNAME'] == 'Вид проверки' and $frst == 0){
		$row_tmp = $row;
		$el_arr = array_pop($data);

		$row = array('COLNAME'=>'Сведения о проведенных проверках', 'COLVALUE'=>'');
		$data[] = $row;
		$data[] = $row_tmp;

		$frst = 1;
	}

	/***(END OF) Last header
	=========
	***/

	/*** Correcting insurance company name
	=========
	***/
	if($row['COLNAME'] == 'Наименование страховой компании'){
		$row_cname = $row['COLNAME'];

		$row_cval = str_replace('-Не определено-', '', $row['COLVALUE']);

		$el_arr = array_pop($data);
		$row = array('COLNAME'=>$row_cname, 'COLVALUE'=>$row_cval);
		$data[] = $row;
	}
	/***(END OF) Correcting insurance company name
	=========
	***/

        $c += 1;
	}
}

/***Adding extra header into table bottom
	=========
***/

$row_name = 'Факты применения мер дисциплинарного воздействия';
$row = array('COLNAME'=>$row_name, 'COLVALUE'=>'');
$data[] = $row;

$row = array('COLNAME'=>'-', 'COLVALUE'=>'-');
$data[] = $row;


/***(END OF) Adding extra header into table bottom
	=========
***/

/*Output encoded JSON data*/
print json_encode($data);

?>