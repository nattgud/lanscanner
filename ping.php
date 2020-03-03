<?php
if(isset($_GET["ip"])) {
	$stream = popen("ping  -w 400 -n 1 -l 8 ".$_GET["ip"]."", "r");
	$data = [];
	while(!feof($stream)) {
		$buffer = fread($stream, 1024);
		array_push($data, $buffer);
	}
	pclose($stream);
	$data = implode("\n", $data);
	$data = preg_split("/\n+/", trim($data));
	$offline = false;
	foreach($data as $d) {
		if(strpos($d, "Destination host unreachable") !== false) {
			$offline = true;
		}
		if(strpos($d, "Lost") !== false) {
			$data = trim(str_replace("Packets: ", "", $d));
		}
	}
	$tdata = explode(",", trim($data));
	$og = $tdata;
	$data = [];
	foreach($tdata as $k => $v) {
		$tdata[$k] = explode("=", trim($v));
		foreach($tdata[$k] as $k2 => $v2) {
			if(strpos($v2, "(") !== false) {
				$v2 = substr($v2, 0, strpos($v2, "("));
			}
			$tdata[$k][$k2] = trim($v2);
		}
		if($tdata[$k][0] != "") {
			$tdata[$k][1] = intval($tdata[$k][1]);
			$data[$tdata[$k][0]] = $tdata[$k][1];
		}
	}
	$data["status"] = !$offline;
	$data["t"] = $og;
	echo json_encode($data);
}
?>