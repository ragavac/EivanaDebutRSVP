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

function changeBackground() {
  document.body.style.backgroundImage = `url(${backgrounds[currentBg]})`;
}

// ✨ RSVP submission that saves to Google Sheets
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;

  if (!name || !attendance) {
    message.textContent = "⚠️ Please fill in all fields.";
    message.style.display = "block";
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwHZAYoVclYxWLBUtY9IuIrcEQUlb2EKgJ3iRzEPgMxwR0dZ6_6EFZNnkqxnafsFkgx/exec", {
      method: "POST",
      body: JSON.stringify({ name, attendance }),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();

    if (result.result === "success") {
      if (attendance === "Yes") {
        message.textContent = `🎉 Thank you, ${name}! Can't wait to celebrate with you! 💕`;
      } else {
        message.textContent = `💖 Thank you, ${name}. We'll miss you on this special night!`;
      }
    } else {
      message.textContent = "⚠️ Oops! Something went wrong. Please try again.";
    }

    message.style.display = "block";
    form.reset();
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    message.textContent = "⚠️ Oops! Something went wrong. Please try again.";
    message.style.display = "block";
  }
});
