<?php
error_reporting(0);
if(isset($_GET["ip"])) {
	$stream = popen("arp -a ".$_GET["ip"], "r");
	$data = [];
	while(!feof($stream)) {
		$buffer = fread($stream, 1024);
		array_push($data, $buffer);
	}
	pclose($stream);
	$data = implode("\n", $data);
	$data = explode("\n", $data);
	foreach($data as $d) {
		if(substr(trim($d), 0, strlen($_GET["ip"])) == $_GET["ip"]) {
			$data = preg_split("/\s+/", trim($d));
			$data = $data[1];
			break;
		}
	}
	if($data[0] == "No ARP Entries Found.") {
		$data = "";
	}
	$data2 = $data;
	
	$stream = popen("tracert -h 1 -w 300 ".$_GET["ip"], "r");
	$data3 = [];
	while(!feof($stream)) {
		$buffer = fread($stream, 1024);
		array_push($data3, $buffer);
	}
	pclose($stream);
	$data3 = implode("\n", $data3);
	if(strpos($data3, "[") !== false) {
		$data3 = explode("\n", $data3);
		$tdata = [];
		$str = "Tracing route to ";
		foreach($data3 as $d) {
			if(substr(strtolower($d), 0, strlen($str)) == strtolower($str)) {
				$d = substr($d, strlen($str));
				$d = explode(" ", $d);
				array_pop($d);
				$data3 = implode(" ", $d);
				break;
			}
		}
	} else {
		$data3 = "";
	}
	
	$data2 = $data;
	$stream = popen("nslookup -w 10 -h 1 ".$_GET["ip"], "r");
	$data = [];
	while(!feof($stream)) {
		$buffer = fread($stream, 1024);
		array_push($data, $buffer);
	}
	pclose($stream);
	$data = implode("\n", $data);
	$tdata = explode("\n", $data);
	$data = [];
	foreach($tdata as $d) {
		if(trim($d) !== "") {
			$d = explode(":", $d);
			foreach($d as $k => $v) {
				$d[$k] = trim($v);
			}
			array_push($data, $d);
		}
	}
	$tdata = $data;
	$data = [];
	foreach($tdata as $k => $v) {
		if(count($v) == 2) {
			$data[strtolower($v[0])] = $v[1];
		}
	}
	$data["mac"] = $data2;
	if(isset($_GET["mac"])) {
		$data["mac"] = urldecode($_GET["mac"]);
	}
	$data2 = file_get_contents("https://mac2vendor.com/api/v4/mac/".urlencode(preg_replace("/\:/", "", $data["mac"])));
	$data2 = json_decode($data2);
	$data["vendor"] = false;
	if($data2->success === true) {
		$data["vendor"] = $data2->payload[0]->vendor;
	}
	if(strtolower($data["server"]) == "unknown") {
		$data["server"] = "";
	}
	$data["hostname"] = $data3;
	
	echo json_encode($data);
}
?>