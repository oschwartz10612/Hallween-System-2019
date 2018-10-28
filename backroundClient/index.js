const player = require('node-wav-player');
var colors = require('colors');

var socket = require('socket.io-client')('http://localhost:1800');

var check = true;

socket.on('connect', function(){
  console.log('Connected!');
  playBackround();
});

socket.on('start', function(data){
  console.log('Stopping backround noise...');
  setTimeout(stop, 1000);
});

socket.on('done', function(data){
  console.log('Begining backround noise');
  playBackround();
});

socket.on('command', function(data){
  console.log(colors.green('%s'), data);
});
socket.on('commandRed', function(data){
  console.log(colors.red('%s'), data);
});

socket.on('disconnect', function(){
  console.log('Disconnected! Requred restart of system!');
  check = false;
  player.stop();
});

function playBackround() {
  check = true;
  player.play({
    path: './backround_not5.1.wav',
    sync: true
  }).then(() => {
    if (check) {
      playBackround();
    }
  }).catch((error) => {
    console.error(error);
  });
}

function stop() {
  check = false;
  player.stop();
}
