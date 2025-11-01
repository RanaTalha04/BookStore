document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "../login.html";
    return;
  }

  // Populate user details
  document.getElementById("userName").textContent = loggedInUser.name || loggedInUser.username;
  document.getElementById("userEmail").textContent = loggedInUser.email;
  document.getElementById("userRole").textContent = loggedInUser.role;
  document.getElementById("userUsername").textContent = loggedInUser.username;

  // Load profile picture if exists
  const savedProfilePic = localStorage.getItem(`profilePic_${loggedInUser.email}`);
  if (savedProfilePic) {
    document.getElementById("profileImg").src = savedProfilePic;
  }

  // Profile picture upload
  const uploadBtn = document.getElementById("uploadBtn");
  const profilePicInput = document.getElementById("profilePicInput");

  uploadBtn.addEventListener("click", () => {
    profilePicInput.click();
  });

  profilePicInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        document.getElementById("profileImg").src = imageUrl;
        localStorage.setItem(`profilePic_${loggedInUser.email}`, imageUrl);
        showPopup("Profile picture updated successfully!", "success");
      };
      reader.readAsDataURL(file);
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
