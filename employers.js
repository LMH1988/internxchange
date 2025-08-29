document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employerForm");
  const list = document.getElementById("opportunityList");

  // Load existing posts from localStorage on page load
  const savedPosts = JSON.parse(localStorage.getItem("employerPosts")) || [];
  savedPosts.forEach(post => renderPost(post));

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Grab form values
    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const description = document.getElementById("description").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const isPaid = document.getElementById("paid").checked;

    // Basic check (for extra safety)
    if (!company || !role || !description || !skills) return;

    const postData = {
      company,
      role,
      description,
      skills,
      isPaid,
      postedAt: new Date().toLocaleString()
    };

    renderPost(postData);

    // Save to localStorage
    savedPosts.push(postData);
    localStorage.setItem("employerPosts", JSON.stringify(savedPosts));

    // Clear the form
    form.reset();
  });

  // Create and inject a post card into the DOM
  function renderPost(data) {
    const card = document.createElement("div");
    card.classList.add("opportunity-card");

    card.innerHTML = `
      <h3>${data.role} <span class="company">@ ${data.company}</span></h3>
      <p class="description">${data.description}</p>
      <p><strong>Skills Wanted:</strong> ${data.skills}</p>
      <p class="paid-label">${data.isPaid ? "💸 Paid Opportunity" : "🚫 Unpaid (Clearly flagged)"}</p>
      <p class="timestamp">Posted: ${data.postedAt}</p>
    `;

    list.prepend(card); // Newest at the top
  }
});
