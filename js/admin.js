document.addEventListener("DOMContentLoaded", () => {
  const usersTableBody = document.querySelector("#usersTable tbody");
  const addUserBtn = document.getElementById("addUserBtn");

  // Handle Delete buttons
  usersTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const row = e.target.closest("tr");
      const userName = row.children[0].textContent;
      if (confirm(`Are you sure you want to delete ${userName}?`)) {
        row.remove();
        showPopup(`${userName} deleted!`, "success");
      }
    }
  });

  // Handle Add User button
  addUserBtn.addEventListener("click", () => {
    // For simplicity, just add a dummy user
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>New User</td>
      <td>new_user</td>
      <td>newuser@example.com</td>
      <td>Cashier</td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    usersTableBody.appendChild(newRow);
    showPopup("New user added!", "success");
  });

  const profileIcon = document.querySelector(".profile-icon");
  const profileDropdown = document.querySelector(".profile-dropdown");

  if (profileIcon && profileDropdown) {
    profileIcon.addEventListener("click", (e) => {
      e.preventDefault();
      profileDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove("show");
      }
    });

    // Handle dropdown item clicks
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const action = item.getAttribute("data-action");
        switch (action) {
          case "account":
            window.location.href = "profile.html";
            break;
          case "email":
            window.location.href = "email.html";
            break;
          case "security":
            window.location.href = "security.html";
            break;

          case "logout":
            localStorage.removeItem("loggedInUser");
            window.location.href = "../login.html";
            break;
        }
        profileDropdown.classList.remove("show");
      });
    });
  }

  // Modal functions for profile features
  function showMyAccountModal() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      showPopup("No user logged in!", "error");
      return;
    }

    const modal = createModal(`
      <h2>My Account</h2>
      <p><strong>Name:</strong> ${loggedInUser.name || loggedInUser.username}</p>
      <p><strong>Email:</strong> ${loggedInUser.email}</p>
      <p><strong>Role:</strong> ${loggedInUser.role}</p>
      <button id="closeModal">Close</button>
    `);
    document.getElementById("closeModal").addEventListener("click", () => modal.remove());
  }

  function showEmailModal() {
    const modal = createModal(`
      <h2>Update Email</h2>
      <form id="emailForm">
        <label for="newEmail">New Email:</label>
        <input type="email" id="newEmail" required>
        <button type="submit">Update Email</button>
        <button type="button" id="closeModal">Cancel</button>
      </form>
    `);

    document.getElementById("emailForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const newEmail = document.getElementById("newEmail").value.trim();
      if (newEmail) {
        // Update email in localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = allUsers.findIndex(u => u.email === loggedInUser.email);
        if (userIndex !== -1) {
          allUsers[userIndex].email = newEmail;
          loggedInUser.email = newEmail;
          localStorage.setItem("users", JSON.stringify(allUsers));
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
          showPopup("Email updated successfully!", "success");
          modal.remove();
        } else {
          showPopup("Error updating email!", "error");
        }
      }
    });

    document.getElementById("closeModal").addEventListener("click", () => modal.remove());
  }

  function showSecurityModal() {
    const modal = createModal(`
      <h2>Change Password</h2>
      <form id="passwordForm">
        <label for="currentPassword">Current Password:</label>
        <input type="password" id="currentPassword" required>
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" required minlength="6">
        <label for="confirmPassword">Confirm New Password:</label>
        <input type="password" id="confirmPassword" required>
        <button type="submit">Change Password</button>
        <button type="button" id="closeModal">Cancel</button>
      </form>
    `);

    document.getElementById("passwordForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
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

      // Update password in localStorage
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = allUsers.findIndex(u => u.email === loggedInUser.email);
      if (userIndex !== -1) {
        allUsers[userIndex].password = newPassword;
        loggedInUser.password = newPassword;
        localStorage.setItem("users", JSON.stringify(allUsers));
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        showPopup("Password changed successfully!", "success");
        modal.remove();
      } else {
        showPopup("Error changing password!", "error");
      }
    });

    document.getElementById("closeModal").addEventListener("click", () => modal.remove());
  }

  // Popup helper
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
