const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors(); // Clear previous validation messages

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    let isValid = true;

    // ---- Email Validation ----
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
      showError("emailError", "Email cannot be empty");
      isValid = false;
    } else if (!email.match(emailPattern)) {
      showError("emailError", "Invalid email format");
      isValid = false;
    }

    // ---- Password Validation ----
    if (password === "") {
      showError("passwordError", "Password cannot be empty");
      isValid = false;
    } else if (password.length < 6) {
      showError("passwordError", "Password must be at least 6 characters long");
      isValid = false;
    }

    // ---- Role Validation ----
    if (role === "") {
      showError("roleError", "Please select your role");
      isValid = false;
    }

    // ---- If All Valid ----
    if (isValid) {
      alert(`Login successful! Welcome ${role}.`);
      setTimeout(() => {
        if (role === "Admin") {
          window.location.href = "admin.html";
        }
        else if (role === "Manager") {
          window.location.href = 'manager.html';
        }
        else if (role == "Cashier") {
          window.location.href = 'cashier.html';
        }
        else if (role == "Customer") {
          window.location.href = 'customer.html';
        }
        else if (role == "Supplier") {
          window.location.href = 'supplier.html';
        }
        else if (role == "Delivery Staff") {
          window.location.href = 'delivery.html';
        }
        else{
          window.location.href = 'index.html';
        }
      }, 1000);
    }
  });
}

// ---- Helper Functions ----
function showError(errorId, message) {
  const errorDiv = document.getElementById(errorId);
  errorDiv.textContent = message;

  // Add red border to related input/select
  const relatedInput = errorDiv.previousElementSibling;
  if (relatedInput) relatedInput.classList.add('error');
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach(field => field.textContent = "");
  document.querySelectorAll("input, select").forEach(el => el.classList.remove('error'));
}
