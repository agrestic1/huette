// Comunication between front and backend
var socket = io.connect(); //load socket.io-client and connect to the host
// function I2C_LED(data) {
//     socket.emit("state", data); //send button state to server
// }
// function Websocket_LED(data) {
//     socket.emit("websocket", data); //send button state to server
// }

// Toggle swicth
var arduino_input = document.getElementById('arduino_switch');
var arduino_outputtext = document.getElementById('arduino_status');

arduino_input.addEventListener('change',function(){
    if(this.checked) {
        socket.emit("state", 1); //send button state to server
        arduino_outputtext.innerHTML = "an";
    } else {
        socket.emit("state", 0); //send button state to server
        arduino_outputtext.innerHTML = "aus";
    }
});

// Toggle swicth
var ESP_input = document.getElementById('ESP_switch');
var ESP_outputtext = document.getElementById('ESP_status');

ESP_input.addEventListener('change',function(){
    if(this.checked) {
        socket.emit("websocket", 1); //send button state to server
        ESP_outputtext.innerHTML = "an";
    } else {
        socket.emit("websocket", 0); //send button state to server
        ESP_outputtext.innerHTML = "aus";
    }
});