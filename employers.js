document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("employerForm");
  const list = document.getElementById("opportunityList");
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");

  let opportunities = []; // Store all posted opportunities here

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const description = document.getElementById("description").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const paid = document.getElementById("paid").checked;

    const opportunity = {
      company,
      role,
      description,
      skills,
      paid
    };

    opportunities.unshift(opportunity); // Add new one to the top
    renderOpportunities();
    form.reset();
  });

  // Live search and filter listeners
  searchInput.addEventListener("input", renderOpportunities);
  typeFilter.addEventListener("change", renderOpportunities);

  function renderOpportunities() {
    const query = searchInput.value.toLowerCase();
    const type = typeFilter.value;

    list.innerHTML = "";

    const filtered = opportunities.filter((opp) => {
      const searchableText = `${opp.company} ${opp.role} ${opp.description} ${opp.skills}`.toLowerCase();
      const matchesSearch = searchableText.includes(query);
      const matchesType =
        type === "all" || (type === "paid" && opp.paid) || (type === "unpaid" && !opp.paid);

      return matchesSearch && matchesType;
    });

    if (filtered.length === 0) {
      list.innerHTML = `<p class="empty-state">No opportunities match your filters just yet.</p>`;
      return;
    }

    filtered.forEach((opp) => {
      const div = document.createElement("div");
      div.classList.add("opportunity");

      div.innerHTML = `
        <h3>${opp.role} <span class="label ${opp.paid ? 'paid' : 'unpaid'}">${opp.paid ? 'Paid' : 'Unpaid'}</span></h3>
        <p><strong>Company:</strong> ${opp.company}</p>
        <p>${opp.description}</p>
        <p><strong>Skills:</strong> ${opp.skills}</p>
      `;

      list.appendChild(div);
    });
  }
});
