const player = require('node-wav-player');

player.play({
  path: './backround.wav',
  sync: true
}).then(() => {
  console.log('Looping backround...');
  playBackround();
}).catch((error) => {
  console.error(error);
});
