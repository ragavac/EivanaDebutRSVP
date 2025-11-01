const form = document.getElementById('rsvpForm');
const message = document.getElementById('responseMessage');

// Set the order of your backgrounds
// Debutant photo appears first 💖
const backgrounds = ['eivana.jpg', 'pool.jpg', 'hall.jpg'];
let currentBg = 0;

// Display first background
document.body.style.backgroundImage = `url(${backgrounds[currentBg]})`;

// Background switching
document.getElementById('nextBg').addEventListener('click', () => {
  currentBg = (currentBg + 1) % backgrounds.length;
  changeBackground();
});

document.getElementById('prevBg').addEventListener('click', () => {
  currentBg = (currentBg - 1 + backgrounds.length) % backgrounds.length;
  changeBackground();
});

function change
