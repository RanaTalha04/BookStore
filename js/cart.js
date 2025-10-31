document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.getElementById("cartBody");
  const totalPriceEl = document.getElementById("totalPrice");
  const backBtn = document.getElementById("backBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartBody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartBody.innerHTML = `<tr><td colspan="5">Your cart is empty!</td></tr>`;
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const row = `
          <tr>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td class="${item.status.toLowerCase()}">${item.status}</td>
            <td><button class="remove-btn" data-index="${index}">Remove</button></td>
          </tr>
        `;
        cartBody.insertAdjacentHTML("beforeend", row);
      });
    }

    totalPriceEl.textContent = total.toLocaleString();
  }

  // Remove item from cart
  cartBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showPopup("Your cart is empty!");
      return;
    }
    showPopup("Checkout complete! Thank you for shopping.");
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  });
  function showPopup(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "25px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = "#7b4a2d";
    popup.style.color = "#fffdfa";
    popup.style.padding = "0.8rem 1.5rem";
    popup.style.borderRadius = "8px";
    popup.style.fontFamily = "'Cormorant Garamond', serif";
    popup.style.fontSize = "1rem";
    popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    popup.style.zIndex = "9999";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease";

    document.body.appendChild(popup);
    setTimeout(() => (popup.style.opacity = "1"), 100);
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 500);
    }, 2000);
  }

  backBtn.addEventListener("click", () => {
    window.location.href = "customer.html";
  });

  renderCart();
});
