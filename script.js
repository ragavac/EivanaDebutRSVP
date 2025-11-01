form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;

  if (!name || !attendance) return;

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxfrVpdkQBWF618WZN05mZWmSg3Q1OauKB2Bt-HmXQGv48Cjj1GntvoiHgWXSKQhwR6/exec", {
      method: "POST",
      body: JSON.stringify({ name, attendance }),
      headers: { "Content-Type": "application/json" }
    });

    // Get text response for debugging
    const resultText = await response.text();

    // Try to parse as JSON (if possible)
    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = { result: "unknown", message: resultText };
    }

    console.log("Server response:", result); // 💻 View this in browser console

    if (result.result === "success") {
      message.textContent = `🎉 Thank you, ${name}! Can't wait to celebrate with you! 💕`;
    } else {
      message.textContent = `⚠️ Oops! Something went wrong: ${result.message}`;
    }

    message.style.display = "block";
    form.reset();

  } catch (error) {
    console.error("Fetch error:", error);
    message.textContent = `🚨 Network error: ${error.message}`;
    message.style.display = "block";
  }
});

