let settings = {
	iconSize: 20
};
let load = 0;
let loadTimer = null;
function updLoad(status = true, ip = false) {
	clearTimeout(loadTimer);
	load++;
	document.querySelector("#load").style.display = "inline-block";
	if(status === false) {
		loadTimer = setTimeout(function() {
			document.querySelector("#load").style.display = "none";
		}, 3000);
		document.querySelector("#startbutton").disabled = false;
	} else {
		document.querySelector("#startbutton").disabled = true;
	}
	document.querySelector("#load").innerHTML = Math.floor((loading[0]/loading[1])*100)+"%"+((ip !== false)?(" <i>"+ip+"</i>"):"");//".".repeat(load);
	if(load > 4) {
		load = 0;
	}
}
var ajax = function(callback, doc, method = "GET", data = null, progressCallback = null, errorCallback = console.log) {
	if(doc === null) {
		return false;
	} else if(callback === null) {
		return false;
	} else {
		let xhr = new XMLHttpRequest();
		xhr.open(method, doc, true);
		xhr.onreadystatechange = function () {
			let DONE = 4;
			let OK = 200;
			if(xhr.readyState === DONE) {
				if(typeof callback == "object") {
					if(callback[0] == undefined) {
						xhr = null;
						return false;
					} else {
						if(xhr.status === OK) {
							callback[0](xhr.response, callback[1]);
						} else {
							callback[0]([false, xhr.status], callback[1]);
						}
					}
				} else {
					if(callback == undefined) {
						xhr = null;
						return false;
					} else {
						if(xhr.status === OK) {
							callback(xhr.response);
						} else {
							callback([false, xhr.status]);
						}
					}
				}
				xhr = null;
			}
		};
		xhr.onerror = errorCallback;
		xhr.send();
	}
};
let vendorList = {
	router: [
		"ADTRAN",
		"Aerohive Networks",
		"Alaxala Networks",
		"Allied Telesis",
		"Alcatel - Stellar",
		"Aruba Networks",
		"Avaya",
		"AVM",
		"Brocade",
		"Billion Electric",
		"Buffalo Technology",
		"Calix",
		"DrayTek",
		"Enterasys",
		"Ericsson",
		"Extreme Networks",
		"Fortinet",
		"HPE",
		"Huawei Routers",
		"Juniper Networks",
		"LANCOM Systems",
		"Mitsubishi",
		"RAD Data Communications",
		"Sierra Wireless",
		"Teltonika",
		"Xirrus",
		"router"
	],
	laptop: [
		"laptop"
	],
	wifi: [
		"Ubiquiti",
		"Belkin",
		"accesspoint",
		"access point",
		"wifi"
	],
	storage: [
		"aiScaler",
		"ApplianSys",
		"Symantec",
		"Exinda",
		"Expand",
		"F5",
		"Infoblox",
		"Lanner Inc",
		"Lotus Foundations",
		"Nortel",
		"PSSC Labs",
		"Radware",
		"Riverbed Technology",
		"Secure64",
		"ftp",
		"samba",
		"cloud"
	],
	wb_incandescent: [
		"Philips",
		"telldus"
	],
	cast: [
		"chromecast"
	],
	desktop_mac: [
		"Apple",
		"mac"
	],
	desktop_windows: [
		"Asus",
		"Intel",
		"Dell",
		"Lenovo",
		"microsoft"
	],
	device_hub: [
		"Arista Networks",
		"Cerio",
		"Ciena",
		"Cisco Systems",
		"Dell",
		"DrayTek",
		"ECI Telecom",
		"EnGenius",
		"Linksys",
		"Mellanox",
		"Meraki",
		"MikroTik",
		"Netgear",
		"Nokia Networks",
		"NEC",
		"Open Mesh",
		"Oracle",
		"Rad Group",
		"Ruckus",
		"Telco",
		"Teledata",
		"TRENDnet",
		"Ubiquiti",
		"Yamaha",
		"ZTE",
		"ZyXEL",
		"switch"
	],
	smartphone: [
		"BlackBerry",
		"Nokia",
		"Alcatel Mobile",
		"smartphone",
		"phone"
	],
	phone_iphone: [
		"apple",
		"iphone"
	],
	phone_android: [
		"pixel",
		"htc",
		"moto",
		"nexus",
		"galaxy",
		"xperia",
		"Huawei",
		"LG",
		"Motorola",
		"OnePlus",
		"Samsung",
		"Siemens",
		"Sony",
		"Xiaomi",
		"ZTE",
		"android"
	],
	tv: [
		"Technicolor",
		"BenQ",
		"Sharp",
		"tv"
	],
	record_voice_over: [
		"google",
		"amazon",
		"alexa",
		"voice"
	],
	videocam: [
		"D-Link",
		"TP-Link",
		"camera",
		"kamera"
	],
	memory: [
		"raspberry pi",
		"arduino",
		"Espressif"
	],
	videogame_asset: [
		"Azurewave",
		"xbox",
		"x-box",
		"ps4",
		"ps3",
		"playstation",
		"nintendo",
		"videogame",
		"game"
	]
};
for(let y in vendorList) {
	for(let x = 0; x < vendorList[y].length; x++) {
		vendorList[y][x] = vendorList[y][x].toLowerCase();
	}
}
let icons = [
	"router",
	"laptop",
	"wifi",
	"storage",
	"wb_incandescent",
	"cast",
	"desktop_mac",
	"desktop_windows",
	"device_hub",
	"smartphone",
	"phone_iphone",
	"tv",
	"videocam",
	"memory",
	"videogame_asset",
	"record_voice_over"
];
function translate(tip, name = false, vendor = false) {
	if(tip.split(".")[3] === "1") {
		return icons[0];
	}
	if(name === false) {
		return "help_outline";
	}
	for(let v in vendorList) {
		if(inList(vendorList[v], name.toLowerCase()) === true) {
			return v;
		}
	}
	if(vendor === false) {
		return icons[1];
	}
	for(let v in vendorList) {
		if(inList(vendorList[v], vendor.toLowerCase()) === true) {
			return v;
		}
	}
	return icons[1];
}
function inList(list, needle) {
	for(let c = 0; c < list.length; c++) {
		if(needle.indexOf(list[c]) !== -1) {
			return true;
		}
	}
	return false;
}
let func = {
	dist: function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));
	}
};

let iplist = [];
let loading = [0, 0];
function start() {
	loading = [0, 0];
	iplist = [];
	for(let q = 0; q < netData.length; q++) {
		ip = netData[q][0];
		sn = netData[q][1];
		let len = [ip[0], ip[1], ip[2], ip[3]];
		let sw = false;
		for(let c = 0; c < 4; c++) {
			if((sn[c] === 0) || (sw === true)) {
				len[c] = 255;
				sw = true;
			} else if(sn[c] < 255) {
				len[c] = ip[c]+(255-sn[c]);
				sw = true;
			}
		}
		for(let c = 0; c < len.length; c++) {
			if(len[c] > 255) {
				len[c] = 255;
			} else if(len[c] <= 0) {
				len[c] = 0;
			}
		}
		for(let c1 = (len[0]!==255)?ip[0]:0; c1 <= len[0]; c1++) {
			for(let c2 = (len[1]!==255)?ip[1]:0; c2 <= len[1]; c2++) {
				for(let c3 = (len[2]!==255)?ip[2]:0; c3 <= len[2]; c3++) {
					for(let c4 = (len[3]!==255)?ip[3]:0; c4 <= len[3]; c4++) {
						iplist.push([c1,c2,c3,c4].join("."));
						if(iplist.length > 255*255) {
							break;
						}
					}
				}
			}
		}
	}
	loading[1] = iplist.length;
	if(iplist.length > 0) {
		updLoad();
		scan(iplist.shift());
	}
}
let countDown = 0;
let countDownStart = null;
let countDownTimer = null;
let countDownTimer2 = null;
let isRunning = false;
let devices = [];
function scan(tip, single = false) {
	isRunning = true;
	ajax(function(txt) {
		let run = true;
		if(single === false) {
			loading[0]++;
			if(loading[0] >= loading[1]) {
				run = false;
			}
		}
		let end = false;
		let toScan = false;
		if(single === false) {
			if(iplist.length > 0) {
				toScan = iplist.shift();
			} else {
				end = true;
			}
			updLoad(run, toScan);
		}
		if(txt == "") {
			console.log("Tom info för "+tip);
			return false;
		}
		if(txt.substr(0, 5) == "false") {
			console.log("Nätverksfel under skanning utav "+tip+". Börja om och behåll fokus på sidan.");
			return false;
		}
		txt = JSON.parse(txt);
		//console.log(txt);
		let status = txt.status;
		if(txt.Lost > 0) {
			status = false;
		}
		for(let c = 0; c < devices.length; c++) {
			if(devices[c].ip === tip) {
				devices[c].status = status;
				break;
			}
		}
		let found = false;
		for(let c = 0; c < devices.length; c++) {
			if(devices[c].ip === tip) {
				found = c;
			}
		}
		let newDevice = false;
		if(found === false) {
			if(status === true) {
				devices.push({
					ip: tip,
					status: status,
					type: translate(tip)
				});
				newDevice = true;
			}
		} else {
			if(status === true) {
				document.querySelector("#IP"+devices[found].ip.replace(/\./g, "_")).classList.remove("offline");
			}
			document.querySelector("#IP"+devices[found].ip.replace(/\./g, "_")).classList.remove("host");
			document.querySelector("#IP"+devices[found].ip.replace(/\./g, "_")).classList.remove("loading");
			devices[found].status = status;
			if(devices[found].type == "help_outline") {
				devices[found].type = translate(tip);
			}
		}
		if(status === true) {
			info(tip);
		}
		if(found === false) {
			if(newDevice === true) {
				updList();
			}
		}
		if(single === false) {
			if(toScan != false) {
				scan(toScan);
			}
			if(end === true) {
				isRunning = false;
				if(repeatScan === true) {
					document.querySelector("#cd").classList.add("open");
					countDownStart = new Date().getTime();
					countDownTimer = setInterval(function() {
						let seconds = (repeatTime*60) - Math.floor(((new Date().getTime())-countDownStart)/1000);
						if(seconds < 60) {
							document.querySelector("#cd").innerText = Math.round(seconds)+"s";
						} else {
							document.querySelector("#cd").innerText = Math.ceil(seconds/60)+"m";
						}
					}, 100);
					countDownTimer2 = setTimeout(function() {
						clearInterval(countDownTimer);
						start();
						document.querySelector("#cd").classList.remove("open");
					}, repeatTime*1000*60);
					//start();
				}
			}
		}
	}, "ping.php?ip="+encodeURIComponent(tip));
}
function info(tip) {
	let mac = [];
	for(let c = 0; c < netData.length; c++) {
		mac.push(netData[2]);
	}
	mac = mac.join("|");
	let local = false;
	for(let c = 0; c < netData.length; c++) {
		if(netData[c][1].join(".") == tip) {
			local = true;
		}
	}
	ajax(function(txt) {
		if(txt == "") {
			console.log("Tom info för "+tip);
			return false;
		}
		if(txt.substr(0, 5) == "false") {
			console.log("Nätverksfel under tiden som mac-adress, hostname mm, hämtades för "+tip+". Börja om och behåll fokus på sidan.");
			return false;
		}
		txt = JSON.parse(txt);
		//console.log(txt);
		for(let c = 0; c < devices.length; c++) {
			if(devices[c].ip == tip) {
				devices[c].server = txt.server;
				devices[c].name = txt.name;
				if((devices[c].name != txt.hostname) || (devices[c].name == "")) {
					devices[c].name = txt.hostname;
				}
				devices[c].mac = txt.mac;
				devices[c].vendor = txt.vendor;
				devices[c].type = translate(devices[c].ip, devices[c].name, devices[c].vendor);
				if(devices[c].vendor == false) {
					devices[c].vendor = "";
				}
				updData(true, tip);
				break;
			}
		}
	}, "info.php?ip="+encodeURIComponent(tip)+((local === true)?("&mac="+mac):""));
}
function updList() {
	let el = document.createElement("DIV");
	let e = devices[devices.length-1];
	el.classList.add("device");
	el.classList.add("loading");
	el.classList.add("new");
	el.addEventListener("mouseover", function() {
		selected = el;
	});
	el.addEventListener("mouseout", function() {
		selected = false;
	});
	setTimeout(function() {
		el.classList.remove("new");
	}, 1000*2);
	el.id = "IP"+e.ip.replace(/\./g, "_");
	if(e.ip == ip.join(".")) {
		el.classList.add("host");
	}
	document.querySelector("#devicelist").appendChild(el);
	if(addAuto === true) {
		place(e.ip, false);
	}
	updData();
}
function updData(stopLoading = false, tip) {
	for(let c = 0; c < devices.length; c++) {
		let e = devices[c];
		document.querySelector("#IP"+e.ip.replace(/\./g, "_")).classList.remove("online");
		if(e.status === false) {
			document.querySelector("#IP"+e.ip.replace(/\./g, "_")).classList.add("offline");
		}
		if(stopLoading === true) {
			if(e.ip == tip) {
				if(document.querySelector("#IP"+e.ip.replace(/\./g, "_")).classList.contains("loading") === true) {
					document.querySelector("#IP"+e.ip.replace(/\./g, "_")).classList.remove("loading");
				}
			}
		}
		let toWrite = "<span class=\"material-icons icon\" onclick=\"place('"+e.ip+"', this);\">"+e.type+"</span><div><table><tbody><tr>";
		toWrite += "<td><p>"+((e.name == undefined)?"":e.name)+"</p><p>"+e.ip+"</p><p class=\"ip\">"+((e.mac == undefined)?"":e.mac)+"</p><p>"+((e.vendor == undefined)?"":e.vendor)+"</p><p>"+((e.server == undefined)?"":e.server)+"</p></div></td>";
		toWrite += "<td><div class=\"tools\"><span class=\"material-icons\" onclick=\"changeType(this.parentNode.parentNode, '"+e.ip+"');\">loop</span><span class=\"material-icons\" onclick=\"delete('"+e.ip+"');\">delete</span></div></td>";
		toWrite += "</tr></tbody></table>";
		if(document.querySelector("#IP"+e.ip.replace(/\./g, "_")).innerHTML != toWrite) {
			document.querySelector("#IP"+e.ip.replace(/\./g, "_")).innerHTML = toWrite;
		}
	}
}
function addDevice() {
	let ok = confirm("Vill du lägga till en ny enhet?");
	if(ok !== false) {
		let tip = prompt("Vilken IP har den nya enheten?");
		scan(tip, true);
		/*
		let found = false;
		for(let c = 0; c < devices.length; c++) {
			if(devices[c].ip == tip) {
				found = c;
				break;
			}
		}
		if(found === false) {
			devices.push({
				ip: tip,
				status: false,
				type: translate(tip)
			});
			updList();
			info(tip);
		} else {
			alert("Enheten "+devices[found].name+"("+devices[found].ip+") är redan funnen");
		}
		*/
	}
}
function changeType(i, tip) {
	for(let c = 0; c < devices.length; c++) {
		if(tip === devices[c].ip) {
			let icon = icons[0];
			for(let q = 0; q < icons.length; q++) {
				if(icons[q] == i.children[0].innerText) {
					let next = q+1;
					if(next > icons.length-1) {
						next = 0;
					}
					icon = icons[next];
					break;
				}
			}
			devices[c].type = icon;
			i.children[0].innerText = icon;
			break;
		}
	}
}
let addAuto = true;
function autoAdd(el) {
	if(el.checked === true) {
		addAuto = true;
	} else {
		addAuto = false;
	}
}
function place(tip, e) {
	if(blueprint !== false) {
		let d = false;
		for(let c = 0; c < devices.length; c++) {
			if(devices[c].ip == tip) {
				d = devices[c];
				break;
			}
		}
		let found = false;
		for(let c = 0; c < map.length; c++) {
			if(map[c].ip === d.ip) {
				found = true;
			}
		}
		if((d !== false) && (found === false)) {
			let hit = true;
			let pos = {
				x: 5,
				y: 5
			};
			while(hit === true) {
				hit = false;
				for(let c = 0; c < map.length; c++) {
					if(
						(pos.x >= map[c].x) &&
						(pos.x < map[c].x+settings.iconSize+10) &&
						(pos.y >= map[c].y) &&
						(pos.y < map[c].y+settings.iconSize+10)
					) {
						hit = true;
					}
				}
				if(hit === true) {
					if(pos.x+settings.iconSize > canvas.width) {
						pos.y += settings.iconSize+10;
						pos.x = 5;
					} else {
						pos.x += settings.iconSize+10;
					}
				}
			}
			d.x = pos.x;
			d.y = pos.y;
			d.r = 0;
			map.push(d);
		}
	}
}

let canvas = null;
let draw = null;
let map = [];
let blueprint = false;
let pre = new Date();
let running = false;
let print = false;
function updMap() {
	canvas.style.display = "block";
	draw.clearRect(0, 0, canvas.width, canvas.height);
	draw.drawImage(blueprint, 0, 0, blueprint.width, blueprint.height);
	draw.lineWidth = 1;
	for(let c = 0; c < map.length; c++) {
		draw.beginPath();
		draw.strokeStyle = "#000";
		draw.fillStyle = "#fff";
		if(hover !== false) {
			if(map[c].ip == hover.ip) {
				draw.fillStyle = "#dff";
			}
		}
		if(selected !== false) {
			if(map[c].ip == selected.ip) {
				draw.fillStyle = "#aff";
			}
		}
		draw.arc(map[c].x+(settings.iconSize/2), map[c].y+(settings.iconSize/2), 5+(settings.iconSize/2), 0, (Math.PI*2));
		draw.fill();
		draw.stroke();
		draw.closePath();
		map[c].r += 0.5;
		if(map[c].r >= 10+(settings.iconSize*2)+(Math.random()*1000)) {
			map[c].r = 5+(settings.iconSize/2);
		}
		draw.drawImage(document.querySelector("#icon_"+map[c].type), map[c].x, map[c].y, settings.iconSize, settings.iconSize);
	}
	for(let c = 0; c < map.length; c++) {
		if(print === false) {
			draw.lineWidth = 2;
			draw.beginPath();
			draw.strokeStyle = "rgba(0,0,255,"+((map[c].r > 10+(settings.iconSize*2))?0:(1-(map[c].r/(10+(settings.iconSize*2)))))+")";
			draw.arc(map[c].x+(settings.iconSize/2), map[c].y+(settings.iconSize/2), map[c].r, 0, (Math.PI*2));
			draw.stroke();
			draw.closePath();
		}
	}
	window.requestAnimationFrame(updMap);
}

function handleFileSelect(evt) {
	var files = evt.target.files;
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match('image.*')) {
			continue;
		}
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
				blueprint = document.createElement("IMG");
				blueprint.src = e.target.result;
				blueprint.onload = function() {
					let scale = 1;
					if(blueprint.width > 2000) {
						scale = 2000/blueprint.width;
					} else if(blueprint.height > 1600) {
						scale = 1600/blueprint.height;
					}
					blueprint.width = Math.floor(blueprint.width*scale);
					blueprint.height = Math.floor(blueprint.height*scale);
					settings.iconSize = blueprint.width*0.01;
					canvas.width = blueprint.width;
					canvas.height = blueprint.height;
					if(running === false) {
						updMap();
					}
				}
			};
		})(f);
		reader.readAsDataURL(f);
	}
}
let selected = false;
let hover = false;
window.addEventListener("load", function() {
	canvas = document.querySelector("canvas");
	draw = canvas.getContext("2d");
	let mouse = false;
	canvas.addEventListener("mousemove", function(event) {
		if(blueprint !== false) {
			let scale = canvas.width/canvas.clientWidth;
			let pos = {
				x: event.offsetX*scale,
				y: event.offsetY*scale
			};
			let closest = false;
			let d = Infinity;
			for(let c = 0; c < map.length; c++) {
				let td = func.dist(map[c].x+(settings.iconSize/2), map[c].y+(settings.iconSize/2), pos.x, pos.y);
				if(td < 5+(settings.iconSize/2)) {
					if(td < d) {
						closest = map[c];
						d = td;
					}
				}
			}
			
			if(mouse === true) {
				selected.x = pos.x-(settings.iconSize/2);
				selected.y = pos.y-(settings.iconSize/2);
			} else if(closest !== false) {
				hover = closest;
			} else {
				hover = false;
			}
		}
	});
	canvas.addEventListener("mousedown", function(event) {
		if(blueprint !== false) {
			let scale = canvas.width/canvas.clientWidth;
			let pos = {
				x: event.offsetX*scale,
				y: event.offsetY*scale
			};
			let closest = false;
			let d = Infinity;
			for(let c = 0; c < map.length; c++) {
				let td = func.dist(map[c].x+(settings.iconSize/2), map[c].y+(settings.iconSize/2), pos.x, pos.y);
				if(td < 10+(settings.iconSize/2)) {
					if(td < d) {
						closest = map[c];
						d = td;
					}
				}
			}
			if(mouse === false) {
				if(closest !== false) {
					selected = closest;
					mouse = true;
					document.querySelector("#IP"+selected.ip.replace(/\./g, "_")).classList.add("selected");
				}
			}
		}
	});
	canvas.addEventListener("mouseup", function() {
		if(selected !== false) {
			document.querySelector("#IP"+selected.ip.replace(/\./g, "_")).classList.remove("selected");
			selected = false;
			mouse = false;
		}
	});
	canvas.addEventListener("contextmenu", function() {
		print = true;
	});
	canvas.addEventListener("mouseout", function() {
		print = false;
		hover = false;
	});
	let size = canvas.parentNode.clientWidth;
	canvas.width = size;
	size = window.innerHeight;
	canvas.height = size-100;
	document.getElementById('input').addEventListener('change', handleFileSelect, false);
});

let zlevel = 0;
let zlevels = [
	100,
	10,
	20,
	30,
	40,
	50,
	60,
	70,
	80,
	90
];
function zoom(dir) {
	zlevel += dir;
	if(zlevel < 0) {
		zlevel = zlevels.length-1;
	} else if(zlevel > zlevels.length-1) {
		zlevel = 0;
	}
	console.log(zlevels[zlevel]+"%");
	document.querySelector("canvas").style.width = zlevels[zlevel]+"%";
}
let repeatScan = false;
let repeatTime = 5;
function repeat(e) {
	document.querySelector("#cd").classList.remove("open");	
	clearInterval(countDownTimer);
	clearTimeout(countDownTimer2);
	if(e.classList.contains("on")) {
		e.classList.remove("on");
		repeatScan = false;
	} else {
		e.classList.add("on");
		repeatScan = true;
		repeatTime = Number(prompt("Hur många minuter mellan avslutad skanning till start av nästa?", repeatTime));
		document.querySelector("#repeatButton").children[1].innerText = repeatTime+"m";
		if(isRunning === true) {
			start();
		}
	}
}

