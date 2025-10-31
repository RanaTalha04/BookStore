document.addEventListener("DOMContentLoaded", () => {
  const ordersTable = document.querySelector("#ordersTable tbody");
  const pendingOrders = JSON.parse(localStorage.getItem("pendingOrders")) || [];

  renderOrders();

  function renderOrders() {
    ordersTable.innerHTML = "";
    if (pendingOrders.length === 0) {
      ordersTable.innerHTML = `<tr><td colspan="6">No pending orders.</td></tr>`;
      return;
    }

    pendingOrders.forEach((order, index) => {
      const total = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
      const row = `
        <tr>
          <td>${order.orderId}</td>
          <td>${order.customer}</td>
          <td>${order.items.length}</td>
          <td>Rs ${total}</td>
          <td>${order.status}</td>
          <td>
            <button onclick="viewOrder(${index})">View</button>
            ${order.status === "Pending" ? `<button onclick="checkoutOrder(${index})">Checkout</button>` : ""}
          </td>
        </tr>`;
      ordersTable.innerHTML += row;
    });
  }

  window.viewOrder = (index) => {
    const order = pendingOrders[index];
    let details = `Order #${order.orderId}\nCustomer: ${order.customer}\n\nItems:\n`;
    order.items.forEach(i => {
      details += `${i.title} - Rs${i.price} x ${i.qty} = Rs${i.price * i.qty}\n`;
    });
    alert(details);
  };

  window.checkoutOrder = (index) => {
    pendingOrders[index].status = "Paid";
    localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
    alert("✅ Order checked out successfully!");
    renderOrders();
  };
});
