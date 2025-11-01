const form = document.getElementById('rsvpForm');
const message = document.getElementById('responseMessage');
const backgrounds = ['pool.jpg', 'hall.jpg', 'eivana.jpg'];
let currentBg = 0;

document.body.style.backgroundImage = `url(${backgrounds[currentBg]})`;

document.getElementById('nextBg').addEventListener('click', () => {
  currentBg = (currentBg + 1) % backgrounds.length;
  changeBackground();
});

document.getElementById('prevBg').addEventListener('click', () => {
  currentBg = (currentBg - 1 + backgrounds.length) % backgrounds.length;
  changeBackground();
});

function changeBackground() {
  document.body.style.backgroundImage = `url(${backgrounds[currentBg]})`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;

  if (!name || !attendance) return;

  if (attendance === "Yes") {
    message.textContent = `🎉 Thank you, ${name}! Can't wait to celebrate with you! 💕`;
  } else {
    message.textContent = `💖 Thank you, ${name}. We'll miss you on this special night!`;
  }

  form.reset();
});
