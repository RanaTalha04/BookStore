document.addEventListener("DOMContentLoaded", () => {
  // ---- Step 1: Initialize All Roles ----
  const roles = [
    { id: 1, name: "admin" },
    { id: 2, name: "cashier" },
    { id: 3, name: "supplier" },
    { id: 4, name: "delivery" },
    { id: 5, name: "customer" },
  ];

  if (!localStorage.getItem("roles")) {
    localStorage.setItem("roles", JSON.stringify(roles));
    console.log("✅ Roles initialized in localStorage");
  }

  // ---- Step 2: Default Users for Each Role ----
  const defaultUsers = [
    {
      name: "Muhammad Talha",
      username: "talha",
      email: "talha@bookstore.com",
      password: "admin123",
      role: "admin",
    },
    {
      name: "Ali Raza",
      username: "ali_cashier",
      email: "cashier@bookstore.com",
      password: "cashier123",
      role: "cashier",
    },
    {
      name: "Hassan Khan",
      username: "hassan_supplier",
      email: "supplier@bookstore.com",
      password: "supplier123",
      role: "supplier",
    },
    {
      name: "Ahmed Malik",
      username: "ahmed_delivery",
      email: "delivery@bookstore.com",
      password: "delivery123",
      role: "delivery",
    },
  ];

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let addedUsers = 0;

  defaultUsers.forEach((user) => {
    if (!users.some((u) => u.email === user.email)) {
      users.push(user);
      addedUsers++;
    }
  });

  if (addedUsers > 0) {
    localStorage.setItem("users", JSON.stringify(users));
    console.log(` ${addedUsers} Default user(s) added.`);
  }

  // ---- Step 3: Handle Login ----
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      let isValid = true;

      // Email validation
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (email === "") {
        showError("emailError", "Email cannot be empty");
        isValid = false;
      } else if (!email.match(emailPattern)) {
        showError("emailError", "Invalid email format");
        isValid = false;
      }

      // Password validation
      if (password === "") {
        showError("passwordError", "Password cannot be empty");
        isValid = false;
      } else if (password.length < 6) {
        showError("passwordError", "Password must be at least 6 characters long");
        isValid = false;
      }

      if (!isValid) return;

      // Check user
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = allUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        showPopup("Invalid email or password", "error");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      console.log(localStorage)

      const name = foundUser.name || foundUser.username || "User";
      showPopup(`Welcome ${name}!`, "success");

      setTimeout(() => {
        switch (foundUser.role.toLowerCase()) {
          case "admin":
            window.location.href = "../Admin/admin.html";
            break;
          case "cashier":
            window.location.href = "../Cashier/cashier.html";
            break;
          case "supplier":
            window.location.href = "../Supplier/supplier.html";
            break;
          case "delivery":
            window.location.href = "../Delivery/delivery.html";
            break;
          case "customer":
            window.location.href = "../Customer/customer.html";
            break;
          default:
            showPopup("Unknown role. Contact Admin.", "error");
        }
      }, 1200);
    });
  }

  // ---- Helper Functions ----
  function showError(errorId, message) {
    const errorDiv = document.getElementById(errorId);
    errorDiv.textContent = message;
    const relatedInput = errorDiv.previousElementSibling;
    if (relatedInput) relatedInput.classList.add("error");
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((f) => (f.textContent = ""));
    document.querySelectorAll("input").forEach((el) => el.classList.remove("error"));
  }

  // ---- Popup ----
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
    }, 2200);
  }
});
