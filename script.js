const form = document.getElementById('rsvpForm');
const message = document.getElementById('responseMessage');

// Set the order of your backgrounds
// Now the debutant photo appears first 💖
const backgrounds = ['eivana.jpg', 'pool.jpg', 'hall.jpg'];
let currentBg = 0;

// Display the first background when page loads
document.body.style.backgroundImage = `url(${backgrounds[currentBg]})`;

// Background switching controls
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

// RSVP form submission
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
