// Set up nodeJS webserver using http
var fs = require('fs'); //require filesystem to read html files
var express = require('express');
var app = express(); 
var http = require('http').createServer(app);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html'); // routes initial call to index.html
});
app.use(express.static('public')); // express public folder
http.listen(8080); //listen to port 8080

var WebSocket = require("ws")
var ipValue = "ws://192.168.178.22:81";
var connection = new WebSocket(ipValue, ['arduino']); 	
//console.log(text)
console.log("IP value changed to:"+ipValue);
connection.onopen = function () {
    connection.send('Message from Browser to ESP8266 yay its Working!! ' + new Date()); 
    connection.send('ping');
    //ws.send("Hello, Ardunio");
};
connection.onerror = function (error) {
    console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {
    console.log('Server: ', e.data);
};

function ledFn(data) {
    var toSend = "LED" + data;
    connection.send(toSend); 
};


const i2c = require('i2c-bus');
const MCP9808_ADDR = 0x05;

var io = require('socket.io')(http) //require socket.io module and pass the http object
io.sockets.on('connection', function (socket) {// WebSocket Connection

  socket.on('state', function (data) { //get button state from client
    const i2c1 = i2c.openSync(1);
    const rawData = i2c1.sendByteSync(MCP9808_ADDR, data);
    i2c1.closeSync();
  })
  socket.on('websocket', function (data) { //get button state from client
    // Websoclet
    ledFn(data);
  })
});

