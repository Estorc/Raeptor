fs = require('fs')

const { spawn } = require('child_process');
DiscordRPCMD = spawn('cmd', ['/c', 'js\\plugins\\discordRP\\rp.bat', process.pid]/*, {detached:true}*/);



function writeSaveInfo() {
	
	let data = ""
	
	if ($gameVariables) data += $gameVariables.value(1000);
	data += ";"
	if ($gameSystem) data += $gameSystem.getSaveDescription().replace("<wordwrap>","")
	data += ";"
	if (SceneManager && SceneManager._scene) data += SceneManager._scene.constructor.name;
	data += ";"
	if ($gameSystem) data += $gameSystem.playtimeText();
	data += ";"
	if ($gameSystem && SceneManager._stack[0]) data += SceneManager._stack[0].name;

	fs.writeFile("js/plugins/discordRP/data.info", data, 'utf8', function (err) {
		if (err) return console.log(err);
	});

}


setInterval(writeSaveInfo, 1000);