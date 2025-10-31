document.addEventListener("DOMContentLoaded", () => {
  const totalPriceEl = document.getElementById("totalPrice");

  function calculateTotal() {
    let total = 0;
    document.querySelectorAll("#cartBody tr").forEach((row) => {
      const price = parseInt(row.children[1].textContent);
      const qty = parseInt(row.children[2].textContent);
      total += price * qty;
    });
    totalPriceEl.textContent = total.toLocaleString();
  }

  // Remove row
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.closest("tr").remove();
      calculateTotal();
    });
  });

  // Checkout: mark all as Accepted
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    document.querySelectorAll("#cartBody tr td:nth-child(4)").forEach((td) => {
      td.textContent = "Accepted";
      td.className = "accepted";
    });
    showPopup("Checkout complete! All orders accepted.");
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "customer.html";
  });

  function showPopup(message, type = "info") {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "25px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = type === "error" ? "#b33a3a" : "#7b4a2d"; // red for error, brown otherwise
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

  calculateTotal();
});
