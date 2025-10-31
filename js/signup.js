document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  let isValid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  // --- Full Name Validation ---
  if (fullname === "") {
    showError("nameError", "Name cannot be empty");
    isValid = false;
  } else if (!/^[A-Za-z ]+$/.test(fullname)) {
    showError("nameError", "Name must contain only letters");
    isValid = false;
  }

  // --- Email Validation ---
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email === "") {
    showError("emailError", "Email cannot be empty");
    isValid = false;
  } else if (!email.match(emailPattern)) {
    showError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  // --- Password Validation ---
  if (password === "") {
    showError("passwordError", "Password cannot be empty");
    isValid = false;
  } else if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters long");
    isValid = false;
  }

  // --- Confirm Password Validation ---
  if (confirmPassword === "") {
    showError("confirmError", "Please confirm your password");
    isValid = false;
  } else if (confirmPassword !== password) {
    showError("confirmError", "Passwords do not match");
    isValid = false;
  }

  if (!isValid) return;

  // --- Save User to Local Storage ---
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.email === email)) {
    showError("emailError", "Email already exists");
    return;
  }

  const newUser = {
    name: fullname,
    username: fullname.replace(/\s+/g, '').toLowerCase(),
    email: email,
    password: password,
    role: "customer"
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showPopup("Account created successfully!");
  document.getElementById("signupForm").reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});

// ---- Helper Functions ----
function showError(errorId, message) {
  const errorDiv = document.getElementById(errorId);
  errorDiv.textContent = message;
  const relatedInput = errorDiv.previousElementSibling;
  if (relatedInput) relatedInput.classList.add("error");
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach(field => field.textContent = "");
  document.querySelectorAll("input, select").forEach(el => el.classList.remove("error"));
}

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
  setTimeout(() => popup.style.opacity = "1", 100);
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 500);
  }, 2000);
}
