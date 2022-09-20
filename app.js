//Got the packages (in the form of objects)
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var fs = require('fs');
var router = express.Router();

//Send the user the 'index.html' file, to let them interact
app.get('/',function(req, res){
	console.log("GETTING");
	console.log(req);
	console.log(res);
	//res.sendFile(__dirname + '/client/Dissertation Game.html');
});

app.use('/', express.static(__dirname + '/client'));

app.post('/', function(req, res){
    console.log("POSTED");
//    console.log(req);
//    console.log(res);

	const d = new Date();
    preString = d.getYear().toString() + '_' + (d.getMonth() + 1).toString() + '_' + d.getDate().toString() + '_' + d.getTime();
	var data = ""
	for(var i in req.rawHeaders){
		data += "," + req.rawHeaders[i]
	}
	
	
    fs.writeFile('./data/' + preString + '.json', data, 'utf8', function(err) {
    if (err) throw err;
    });


	console.log(req.headers);
	res.send("Post Recieved");
});

//Start the server on a port
serv.listen(8010);
console.log("Server started.");
