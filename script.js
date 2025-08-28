document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("swapForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Grab the values from the form
    const name = document.getElementById("name").value.trim();
    const offer = document.getElementById("offer").value.trim();
    const want = document.getElementById("want").value.trim();

    // Make sure all fields are filled
    if (!name || !offer || !want) return;

    // Create the card container
    const card = document.createElement("div");
    card.classList.add("swap-card");

    // Build the inner HTML of the card
    card.innerHTML = `
      <h4 class="card-name">${name}</h4>
      <p><strong>Can offer:</strong> ${offer}</p>
      <p><strong>Wants to learn:</strong> ${want}</p>
    `;

    // Add the card to the board
    document.getElementById("swapBoard").appendChild(card);

    // Reset form
    this.reset();
  });
});

