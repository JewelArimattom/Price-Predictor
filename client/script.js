document.addEventListener("DOMContentLoaded", () => {
  fetch("http://127.0.0.1:5000/get_location_names")
    .then(res => res.json())
    .then(data => {
      const locationSelect = document.getElementById("location");
      data.locations.forEach(loc => {
        const option = document.createElement("option");
        option.value = loc;
        option.textContent = loc;
        locationSelect.appendChild(option);
      });
    });

  document.getElementById("price-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const sqft = parseFloat(document.getElementById("sqft").value);
    const bhk = parseInt(document.getElementById("bhk").value);
    const bath = parseInt(document.getElementById("bath").value);
    const location = document.getElementById("location").value;

    const resultBox = document.getElementById("result");
    resultBox.classList.remove("hidden");
    resultBox.style.color = "#444";
    resultBox.textContent = "Predicting...";

    fetch("http://127.0.0.1:5000/predict_home_price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, sqft, bhk, bath }),
    })
      .then(res => res.json())
      .then(data => {
        resultBox.style.color = "#2e7d32";
        resultBox.textContent = `Estimated Price: ₹${data.estimated_price} Lakhs`;
      })
      .catch(() => {
        resultBox.style.color = "red";
        resultBox.textContent = "❌ Could not fetch prediction. Try again.";
      });
  });
});
