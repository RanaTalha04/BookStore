document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const emailStep = document.getElementById("emailStep");
  const passwordStep = document.getElementById("passwordStep");
  const resetPasswordBtn = document.getElementById("resetPasswordBtn");

  let verifiedEmail = "";

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      const email = document.getElementById("email").value.trim();

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

      if (!isValid) return;

      // Check if user exists
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = allUsers.find((u) => u.email === email);

      if (!foundUser) {
        showError("emailError", "No account found with this email");
        return;
      }

      // Email verified, show password reset step
      verifiedEmail = email;
      emailStep.style.display = "none";
      passwordStep.style.display = "block";
      document.querySelector("h1").textContent = "Reset Password";
      document.querySelector(".subtitle").textContent = "Enter your new password";
    });
  }

  if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener("click", function () {
      clearErrors();

      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      let isValid = true;

      // Password validation
      if (newPassword === "") {
        showError("passwordError", "Password cannot be empty");
        isValid = false;
      } else if (newPassword.length < 6) {
        showError("passwordError", "Password must be at least 6 characters long");
        isValid = false;
      }

      // Confirm password validation
      if (confirmPassword === "") {
        showError("confirmError", "Please confirm your password");
        isValid = false;
      } else if (confirmPassword !== newPassword) {
        showError("confirmError", "Passwords do not match");
        isValid = false;
      }

      if (!isValid) return;

      // Update password in localStorage
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = allUsers.findIndex((u) => u.email === verifiedEmail);

      if (userIndex !== -1) {
        allUsers[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(allUsers));
        showPopup("Password reset successfully!", "success");

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        showError("passwordError", "Error updating password. Please try again.");
      }
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
    document
      .querySelectorAll(".error-message")
      .forEach((f) => (f.textContent = ""));
    document
      .querySelectorAll("input")
      .forEach((el) => el.classList.remove("error"));
  }

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
});
