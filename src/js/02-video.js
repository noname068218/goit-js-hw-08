import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = document.querySelector('#vimeo-player');
const player = new Player(vimeoPlayer);

const playOn = function (data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
};

player.on('timeupdate', throttle(playOn, 1000));

player.setCurrentTime(
  JSON.parse(localStorage.getItem('videoplayer-current-time')) || 0
);
