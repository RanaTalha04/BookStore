document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "../login.html";
    return;
  }

  // Display current email
  document.getElementById("currentEmailDisplay").textContent = loggedInUser.email;

  // Email update form
  const emailForm = document.getElementById("emailForm");
  emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newEmail = document.getElementById("newEmail").value.trim();

    if (!newEmail) {
      showPopup("Please enter a new email address!", "error");
      return;
    }

    if (newEmail === loggedInUser.email) {
      showPopup("New email is the same as current email!", "error");
      return;
    }

    // Update email in localStorage
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = allUsers.findIndex(u => u.email === loggedInUser.email);
    if (userIndex !== -1) {
      allUsers[userIndex].email = newEmail;
      loggedInUser.email = newEmail;
      localStorage.setItem("users", JSON.stringify(allUsers));
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      // Update profile picture key if exists
      const oldProfilePicKey = `profilePic_${allUsers[userIndex].email}`;
      const newProfilePicKey = `profilePic_${newEmail}`;
      const profilePic = localStorage.getItem(oldProfilePicKey);
      if (profilePic) {
        localStorage.setItem(newProfilePicKey, profilePic);
        localStorage.removeItem(oldProfilePicKey);
      }

      document.getElementById("currentEmailDisplay").textContent = newEmail;
      document.getElementById("newEmail").value = "";
      showPopup("Email updated successfully!", "success");
    } else {
      showPopup("Error updating email!", "error");
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
