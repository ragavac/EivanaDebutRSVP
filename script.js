const form = document.getElementById('rsvpForm');
const message = document.getElementById('responseMessage');

// 🌸 Background slideshow setup
// Debutant photo appears first
const backgrounds = ['eivana.jpg', 'pool.jpg', 'design.jpg', 'logo.jpg', 'table.jpg', 'view.jpg', 'pool1.jpg', 'pool2.jpg' ];
let currentBg = 0;

// Show first background
document.body.style.backgroundImage = `url(${backgrounds[currentBg]})`;

// Buttons for next/prev background
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

// ✨ RSVP submission to SheetDB
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;

  if (!name || !attendance) return;

  try {
  const response = await fetch("https://sheetdb.io/api/v1/d0dcx8l5j24zc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [{ 
        name: document.getElementById("name").value.trim(),
        attendance: document.getElementById("attendance").value,
        timestamp: new Date().toISOString()
      }]
    })
  });

  const result = await response.json();
  console.log("RSVP saved:", result);

  if (attendance === "Yes") {
    message.textContent = `🎉 Thank you, ${name}! Can't wait to celebrate with you! 💕`;
  } else {
    message.textContent = `💖 Thank you, ${name}. We'll miss you on this special night!`;
  }

  message.style.display = "block";
  form.reset();

} catch (error) {
  console.error("Error submitting RSVP:", error);
  message.textContent = "⚠️ Oops! Something went wrong. Please try again.";
  message.style.display = "block";
}
});

