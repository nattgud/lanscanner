<!DOCTYPE html>
<html lang="sv">
<head>
<title>Network scanner</title>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css.css">
<script src="js.js"></script>
<script>
<?php
$stream = popen("ipconfig /all", "r");
$data = [];
while(!feof($stream)) {
	$buffer = fread($stream, 1024);
	array_push($data, $buffer);
}
pclose($stream);
$data = implode("", $data);
$data = explode("\n\n", $data);
$tdata = [];
foreach($data as $d) {
	if(strpos($d, "IPv4") !== false) {
		array_push($tdata, $d);
	}
}
$data = $tdata;
$tdata = [];
$ips = [];
foreach($data as $k => $d) {
	$d = explode("\n", $d);
	$ip = [];
	$gw = "";
	$sn = "";
	$mac = "";
	$new = [
		"ip" => [],
		"gw" => "",
		"sn" => "",
		"mac" => ""
	];
	foreach($d as $r) {
		$end = false;
		if(substr(trim($r), 0, 4) == "IPv4") {
			$ip = trim($r);
			$ip = trim(explode(":", $ip)[1]);
			$ip = str_replace("(Preferred)", "", $ip);
			$ip = explode(".", $ip);
			$new["ip"] = $ip;
		}
		$l = strlen("Subnet Mask");
		if(substr(trim($r), 0, $l) == "Subnet Mask") {
			$sn = trim($r);
			$sn = trim(explode(":", $sn)[1]);
			$sn = explode(".", $sn);
			$new["sn"] = $sn;
		}
		$l = strlen("Default Gateway");
		if(substr(trim($r), 0, $l) == "Default Gateway") {
			$gw = trim($r);
			$gw = trim(explode(":", $gw)[1]);
			if($gw !== "") {
				$end = true;
			}
			$new["gw"] = $gw;
		}
		$l = strlen("Physical Address");
		if(substr(trim($r), 0, $l) == "Physical Address") {
			$mac = trim($r);
			$mac = trim(explode(":", $mac)[1]);
			$new["mac"] = $mac;
		}
		if($end === true) {
			//break;
		}
	}
	if($gw !== "") {
		foreach($ip as $k => $v) {
			$ip[$k] = intval($v);
		}
		foreach($sn as $k => $v) {
			$sn[$k] = intval($v);
		}
		$tdata = [$ip, $sn, $mac];
	}
	$exists = false;
	foreach($ips as $i) {
		if($i[2] === $tdata[2]) {
			$exists = true;
			break;
		}
	}
	if($exists === false) {
		if(count($tdata) == 3) {
			array_push($ips, $tdata);
		}
	}
}
if(count($tdata) === 0) {
?>
</script>
<p>Du verkar sakna nätverk. Aktivera nätverket och uppdatera sidan.</p>
<?php
} else {
	echo "var netData = ".json_encode($ips).";
";
	echo "let ip = ".json_encode($tdata[0]).";
";
	echo "let sn = ".json_encode($tdata[1]).";
";
	echo "let mac = ".json_encode($tdata[2]).";
";
?>
</script>
</head>
<body>
<div style="display: block;">
<?php
$imgs = scandir("icons");
foreach($imgs as $i) {
	if(in_array($i, [".", ".."]) === false) {
		echo "<img src=\"icons/".$i."\" id=\"icon_".(substr($i, 0, strpos($i, "-24")))."\">";
	}
}
?>
</div>
<div id="cd">0</div>
<div id="zoom">
<span class="material-icons" onclick="zoom(-1);">zoom_out</span><span class="material-icons" onclick="zoom(1);">zoom_in</span>
</div>
<table><tbody>
<tr><td colspan=2>
<span id="repeatButton" class="button" onclick="repeat(this);"><span class="material-icons">repeat</span><span>5m</span></span> <input type="button" onclick="start();" value="Börja sök" id="startbutton"><span id="load"></span>
<br>
<p style="margin: 0px;"><input type="button" onclick="addDevice();" value="Lägg till enhet"><input type="checkbox" onclick="autoAdd(this);" checked>Lägg till på kartan automatiskt</p>
</td></tr><tr><td style="text-align: center;">
<label for="input" class="addPhoto"><span class="material-icons">add_photo_alternate</span></label>
<input type="file" id="input" value="test" name="input" style="display: none;">
<div id="devicelist"></div>
</td><td>
<canvas></canvas>

</td></tr></tbody></table>
<?php
}
?>
</body>
</html>











