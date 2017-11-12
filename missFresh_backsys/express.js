const express = require('express')

const app = express()

//const http = require('http').Server(app);

//var expressWs = require('express-ws')(app)

const path = require('path')

const apiRoute = require('./routes/api.js')

const bodyParser = require('body-parser')

const cookieSession = require('cookie-session')

//const util = require('util');

//var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname)))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.use(cookieSession({
	name : 'session',
	secret : 'some random charactors',
	maxAge : 1000*3600*24
}))

app.use('/api',apiRoute)

//app.ws('/ws', function(ws, req) {  
//	console.log(ws);
//	util.inspect(ws);  
//	ws.on('message', function(msg) {  
//	    console.log('_message');  
//	    console.log(msg);
////	    console.log(ws);  
//	    ws.send('mmp')
//	});
//})  


app.listen(process.env.PORT || '4000')
//io.on('connection', function (socket) {
////socket.name = ++i
////onlineusers[socket.name] = socket
//socket.on('message', function (data) {
//	console.log(data);
//  // for (var key in onlineusers) {
//  //   onlineusers[key].emit('news', { msg: data.my })
//  // }
////  socket.emit('news', { msg: data.my });
////  socket.broadcast.emit('news', { msg: data.my });
//});
//});







