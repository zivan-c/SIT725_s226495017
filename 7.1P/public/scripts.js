const socket = io();

const counterDisplay = document.getElementById('counter');
const clickButton = document.getElementById('clickBtn');

socket.on('updateCount', (newCount) => {

  console.log('New global count received:', newCount);
  counterDisplay.innerText = newCount;

});

clickButton.addEventListener('click', () => {

  socket.emit('buttonClicked');

});