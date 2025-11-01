document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "../login.html";
    return;
  }

  // Password change form
  const passwordForm = document.getElementById("passwordForm");
  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (currentPassword !== loggedInUser.password) {
      showPopup("Current password is incorrect!", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showPopup("New passwords do not match!", "error");
      return;
    }
    if (newPassword.length < 6) {
      showPopup("New password must be at least 6 characters!", "error");
      return;
    }
    if (newPassword === loggedInUser.password) {
      showPopup("New password is the same as current password!", "error");
      return;
    }

    // Update password in localStorage
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = allUsers.findIndex(u => u.email === loggedInUser.email);
    if (userIndex !== -1) {
      allUsers[userIndex].password = newPassword;
      loggedInUser.password = newPassword;
      localStorage.setItem("users", JSON.stringify(allUsers));
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      // Clear form
      document.getElementById("currentPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
      showPopup("Password changed successfully!", "success");
    } else {
      showPopup("Error changing password!", "error");
    }
  });

  // Profile dropdown functionality
  const profileIcon = document.querySelector(".profile-icon");
  const profileDropdown = document.querySelector(".profile-dropdown");

  if (profileIcon && profileDropdown) {
    profileIcon.addEventListener("click", (e) => {
      e.preventDefault();
      profileDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove("show");
      }
    });

    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      window.location.href = "../login.html";
    });
  }

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
