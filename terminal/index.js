var colors = require('colors');
var socket = require('socket.io-client')('http://localhost:1800');

socket.on('connect', function(){
  console.log('Connected!');
});

socket.on('start', function(data){
  console.log('Sequence starting...');
});

socket.on('command', function(data){
  console.log(colors.green('%s'), data);
});
socket.on('commandRed', function(data){
  console.log(colors.red('%s'), data);
});

socket.on('disconnect', function(){
  console.log('Disconnected! Requred restart of system!');
  player.stop();
});
