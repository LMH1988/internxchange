document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("swapForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const offer = document.getElementById("offer").value;
    const want = document.getElementById("want").value;

    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${name}</strong> can offer <em>${offer}</em> and wants to learn <em>${want}</em>`;

    document.getElementById("swapBoard").appendChild(listItem);

    this.reset(); // Clear form
  });
});
