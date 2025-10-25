document.addEventListener("DOMContentLoaded", () => {
  const getStartedBtn = document.getElementById("getStartedBtn");
  const viewButtons = document.querySelectorAll(".view-btn");

  // Redirect to login
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // Add click events for all book view buttons
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("More details feature coming soon!");
    });
  });
});
