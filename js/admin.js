document.addEventListener("DOMContentLoaded", () => {
  const usersTableBody = document.querySelector("#usersTable tbody");
  const addUserBtn = document.getElementById("addUserBtn");

  // Handle Delete buttons
  usersTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const row = e.target.closest("tr");
      const userName = row.children[0].textContent;
      if (confirm(`Are you sure you want to delete ${userName}?`)) {
        row.remove();
        showPopup(`${userName} deleted!`, "success");
      }
    }
  });

  // Handle Add User button
  addUserBtn.addEventListener("click", () => {
    // For simplicity, just add a dummy user
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>New User</td>
      <td>new_user</td>
      <td>newuser@example.com</td>
      <td>Cashier</td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    usersTableBody.appendChild(newRow);
    showPopup("New user added!", "success");
  });

  // Popup helper
  function showPopup(message, type = "info") {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "25px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = type === "error" ? "#b33a3a" : "#7b4a2d";
    popup.style.color = "#fffdfa";
    popup.style.padding = "0.8rem 1.5rem";
    popup.style.borderRadius = "8px";
    popup.style.fontFamily = "'Cormorant Garamond', serif";
    popup.style.fontSize = "1rem";
    popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
    popup.style.zIndex = "9999";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease";

    document.body.appendChild(popup);
    setTimeout(() => (popup.style.opacity = "1"), 100);
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 500);
    }, 1800);
  }
});
