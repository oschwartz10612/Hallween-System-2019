  const player = require('node-wav-player');
const readline = require('readline');
var colors = require('colors');
var SerialPort = require('serialport');

var port = new SerialPort('/dev/cu.usbmodem14241', {
  baudRate: 9600
});

port.on('open', function() {
  console.log('\nConnection established with controller!');
});

var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});
server.listen(1900);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

section1();

function section1() {
  rl.question('Start section 1?', (answer) => {
    io.emit('start1');
    player.stop();
    console.log('Playing...');
    setTimeout(sendCommand, 6455, '1');
    setTimeout(sendCommand, 7455, '2');
    setTimeout(sendCommand, 8455, '3');
    setTimeout(sendCommandRed, 9455, 'Slam window!');

    player.play({
      path: './section1_not5.1.wav',
      sync: true
    }).then(() => {
      section2();
    }).catch((error) => {
      console.error(error);
    });
  });
}

function section2() {
  rl.question('Start section 2?', (answer) => {
    io.emit('start2');
    setTimeout(sendCommand, 31245, '1');
    setTimeout(sendCommand, 32245, '2');
    setTimeout(sendCommand, 33245, '3');
    setTimeout(sendSerial, 33245, '0,0');
    setTimeout(sendCommandRed, 34245, 'Drop dino!');
    setTimeout(sendSerial, 35245, '1,0');

    player.play({
      path: './section2_not5.1.wav',
      sync: true
    }).then(() => {
      io.emit('done');
      section1();
    }).catch((error) => {
      console.error(error);
    });
  });
}


function sendCommand(arg) {
  console.log(colors.green('%s'), arg);
  io.emit('command', arg);
}

function sendCommandRed(arg) {
  console.log(colors.red('%s'), arg);
  io.emit('commandRed', arg);
}

function sendSerial(arg) {
  port.write(arg, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log(arg + ' sent to controller.');
  });
}
