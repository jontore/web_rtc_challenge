var messenger = require('rtc-switchboard-messenger');
var signaller = require('rtc-signaller')(messenger('http://192.168.7.119:3000'));

var otherPlayer = '';


signaller.on('peer:announce', function(data) {
  console.log(data.id, 'JOINED');
  otherPlayer = data.id;
});

signaller.on('peer:leave', function(data) {
  console.log(data.id, 'LEFT');
});

signaller.announce({ room: 'foobar' });

function sendMessage (text) {
  signaller.send('/chat', text);
}

function listenForMessage (fn) {
  signaller.on('message:chat', fn);
};


window.sendMessage = sendMessage;
window.listenForMessage = listenForMessage;

