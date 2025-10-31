document.addEventListener("DOMContentLoaded", () => {

  const books = [
    { id: 1, title: "The Art of Reading", author: "John Writer", price: 1200, img: "../Assets/Images/books-stack.jpg" },
    { id: 2, title: "Stories Untold", author: "Sarah Page", price: 950, img: "../Assets/Images/books-stack.jpg" },
    { id: 3, title: "Winds of Time", author: "Aiman Tariq", price: 1500, img: "../Assets/Images/books-stack.jpg" },
    { id: 4, title: "Tales of Dawn", author: "Hamza Malik", price: 1100, img: "../Assets/Images/books-stack.jpg" },
    { id: 5, title: "Silent Echoes", author: "Mehak Javed", price: 800, img: "../Assets/Images/books-stack.jpg" },
    { id: 6, title: "Ink & Soul", author: "Bilal Ahmed", price: 1300, img: "../Assets/Images/books-stack.jpg" },
  ];

  const bookContainer = document.querySelector(".book-container");

  bookContainer.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p class="price">Price: ${book.price} PKR</p>
      <button class="add-btn" data-id="${book.id}">Add to Cart</button>
    `;
    bookContainer.appendChild(card);
  });

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  bookContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
      const bookId = parseInt(e.target.dataset.id);
      const selectedBook = books.find(b => b.id === bookId);

      const existingItem = cart.find(item => item.id === bookId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...selectedBook, quantity: 1, status: "Pending"});
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showPopup(`${selectedBook.title} added to cart!`, "success");
    }
  });

  function showPopup(message, type = "info") {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "25px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background =
      type === "success" ? "#7b4a2d" : type === "error" ? "#b33a3a" : "#555";
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
