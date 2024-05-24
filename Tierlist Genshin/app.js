const { createServer } = require('node:http');
const fs = require('fs');
const { open } = require("openurl")

const hostname = '127.0.0.1';
const port = 8080;


const cheerio = require('cheerio');
const axios = require('axios');

var SongNum = 1;
var PlaylistNum = 1;
var userData;
var currentSong = {name:"", album:"", thumbnail:""};


function searchNextSong() {
	return new Promise((resolve) => {
		axios.get("https://genshin-impact.fandom.com/wiki/Soundtrack")
		.then((response) => {
			let $ = cheerio.load(response.data);
			console.log(PlaylistNum);
			let albumUrl = $(`tr:has(td)`).eq(PlaylistNum-1).find("a:eq(1)").attr('href');
			if (albumUrl) {
				let url = `https://genshin-impact.fandom.com${albumUrl}`;
				axios.get(url)
				.then((response) => {
					let $ = cheerio.load(response.data);
					url = $(`.embedvideo-evl:eq(${SongNum-1})`).attr('data-video-json');
					if (url) {
						url = `${JSON.parse($(`.embedvideo-evl:eq(${SongNum-1})`).attr('data-video-json')).id}`;
						currentSong.name = $(`.embedvideo-evl:eq(${SongNum-1})`).parent().parent().find("a:eq(1)").attr('title');
						currentSong.album = $('.mw-page-title-main').text();
						currentSong.thumbnail = $('.image-thumbnail').find("img:eq(0)").attr("src");
						console.log(url);
						resolve(url);
					} else {
						PlaylistNum++;
						SongNum = 1;
						resolve(searchNextSong());
					}
				})
			} else {
				resolve("lMMenbYo3Xg");
			}
		})
	});
}

//let url = await searchNextSong();
//console.log(url);

async function loadServer(res) {
	/*res.end(`<html>
	<body>
	<iframe width="1280" height="720" src="https://www.youtube.com/embed/${url}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</body>
	</html>`);*/
}

const server = createServer((req, res) => {
	fs.readFile('./index.html', function (err, html) {
		if (err) throw err;    
		res.writeHeader(200, {"Content-Type": "text/html"});  
		res.write(html);  
		res.end();  
	});	
});

async function loadSong(client) {

	timer = 1;
	setTimeout(() => {timer = 0}, 2000);
	client.send(JSON.stringify({ "video": await searchNextSong()}));

}

if (!fs.existsSync("data.json")) {
	fs.writeFileSync("data.json", '{"tierlist":[],"lastSongId":1,"lastPlaylistId":1}');
}


userData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
SongNum = userData.lastSongId;
PlaylistNum = userData.lastPlaylistId;


//fs.writeFileSync('data.json', JSON.stringify(userData));

open('http://localhost:8080');


const io = require('socket.io')(server);
let allClients = 0;
let clientId = 1;
let waitingNote = false;
var timer = 0;
io.on('connection', function(client) {
	let my_timer;
	let my_client = { "id": clientId, "obj": client };
	clientId += 1;
	allClients += 1;
	loadSong(my_client.obj);
	client.on('message', function(data) {
		args = data.split(" ");
		if (!timer && args[0] === "changeSong") {
			if (userData.tierlist.some(item => item.id === SongNum && item.albumId === PlaylistNum)) {
				SongNum++;
				loadSong(my_client.obj);
			} else {
				waitingNote = true;
			}
		}
		if (args[0] === "note") {
			if (!userData.tierlist.some(item => item.id === SongNum && item.albumId === PlaylistNum)) {
				let song = {};
				Object.assign(song, currentSong);
				song.note = eval(args[1]);
				song.id = SongNum;
				song.albumId = PlaylistNum;
				userData.tierlist.push(song);
				console.log(userData);
			} else {
				let song = userData.tierlist.find(item => item.id === SongNum && item.albumId === PlaylistNum);
				Object.assign(song, currentSong);
				song.note = eval(args[1]);
				song.id = SongNum;
				song.albumId = PlaylistNum;
				console.log(userData);
			}
			if (waitingNote) {
				SongNum++;
				loadSong(my_client.obj);
				waitingNote = false;
			}
		}
		if (args[0] === "save") {
			userData.lastSongId = SongNum;
			userData.lastPlaylistId = PlaylistNum;
			fs.writeFileSync("data.json", JSON.stringify(userData));
		}
	});
	client.on('disconnect', function() {
	  clearTimeout(my_timer);
	  allClients -= 1;
	  console.log('disconnect');
	});
  });

server.listen(port);