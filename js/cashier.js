document.addEventListener("DOMContentLoaded", () => {
  const ordersTableBody = document.querySelector("#ordersTable tbody");
  const logoutBtn = document.getElementById("logoutBtn");

  // Handle Accept button clicks
  ordersTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("accept-btn")) {
      const row = e.target.closest("tr");
      const orderId = row.querySelector("td:first-child").textContent;
      row.querySelector("td:nth-child(5)").textContent = "Accepted"; 
      row.querySelector("td:nth-child(5)").classList.remove("pending");
      row.querySelector("td:nth-child(5)").classList.add("accepted");
      e.target.remove(); 
      showPopup(`Order #${orderId} accepted!`, "success");
    }
  });

  // Logout button
  logoutBtn.addEventListener("click", () => {
    window.location.href = "../login.html";
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
    }, 2200);
  }
});
