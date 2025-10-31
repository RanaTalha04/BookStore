let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const tbody = document.querySelector("#cartTable tbody");
  const totalAmount = document.getElementById("totalAmount");

  tbody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>Your cart is empty</td></tr>";
    totalAmount.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const row = `
      <tr>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        <td>${item.price * item.qty}</td>
      </tr>`;
    tbody.innerHTML += row;
    total += item.price * item.qty;
  });

  totalAmount.textContent = total;
}

function addToCart(title, price) {
  const existing = cart.find(i => i.title === title);
  if (existing) existing.qty++;
  else cart.push({ title, price, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("placeOrder").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const customer = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "Customer" };
  const pendingOrders = JSON.parse(localStorage.getItem("pendingOrders")) || [];

  const newOrder = {
    orderId: Date.now(),
    customer: customer.name,
    items: cart,
    status: "Pending"
  };

  pendingOrders.push(newOrder);
  localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));

  alert("✅ Order placed successfully! Cashier will handle your checkout.");
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
});

renderCart();
