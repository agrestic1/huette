// Set up nodeJS webserver using http
var fs = require('fs'); //require filesystem to read html files
var express = require('express');
var app = express();
var http = require('http').createServer(app);
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html'); // routes initial call to index.html
});
app.use(express.static('public')); // express public folder
http.listen(8080); //listen to port 8080

// Websocket communication wir ESP8266
var WebSocket = require("ws")
var ipValue = "ws://192.168.178.22:81";
var connection = new WebSocket(ipValue, ['arduino']);
console.log("IP value changed to:" + ipValue);
connection.onopen = function() {
    connection.send('Message from Browser to ESP8266 yay its Working!! ' + new Date());
    connection.send('ping');
};
connection.onerror = function(error) {
    console.log('WebSocket Error ', error);
};
connection.onmessage = function(e) {
    console.log('Server: ', e.data);
};

function ledFn(data) {
    connection.send(data);
};

// I2C for communication with arduino
const i2c = require('i2c-bus');
const MCP9808_ADDR = 0x05;

var io = require('socket.io')(http) //require socket.io module and pass the http object
io.sockets.on('connection', function(socket) { // WebSocket Connection

    socket.on('state', function(data) { //get content from function "state"  from client
        const i2c1 = i2c.openSync(1);
        console.log('Sending to arduino: ', data);
        const rawData = i2c1.sendByteSync(MCP9808_ADDR, data);
        i2c1.closeSync();
    })
    socket.on('websocket', function(data) { //get content from function "websocket"  from client
        // Websocket
        ledFn(data);
    })
});