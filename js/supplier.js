document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#supplierTable tbody");

  // Handle Update Stock button click
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("update-btn")) {
      const row = e.target.closest("tr");
      const quantityCell = row.querySelector("td:nth-child(5)");

      let newQty = prompt(
        `Update stock for "${row.children[1].textContent}":`,
        quantityCell.textContent
      );

      if (newQty !== null) {
        newQty = parseInt(newQty);
        if (!isNaN(newQty) && newQty >= 0) {
          quantityCell.textContent = newQty;
          showPopup(`Stock updated to ${newQty} for "${row.children[1].textContent}"`, "success");
        } else {
          showPopup("Invalid quantity entered!", "error");
        }
      }
    }
  });

  // Popup function
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
