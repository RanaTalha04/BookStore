document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const getStartedBtn = document.getElementById("getStartedBtn");
  const viewButtons = document.querySelectorAll(".view-btn");
  const contactForm = document.querySelector("contactForm");

  // ====== Mobile Navbar ======
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Close navbar when a link is clicked (mobile UX improvement)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });
  }

  // ====== "Get Started" Button ======
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // ====== "View Details" Buttons ======
  if (viewButtons.length > 0) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        showPopup("More details feature coming soon!");
      });
    });
  }

  // ====== Contact Form (if present) ======
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("⚠️ Please fill out all fields before submitting.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
      }

      alert(
        "✅ Thank you for contacting us, " +
          name +
          "! We’ll get back to you soon."
      );
      contactForm.reset();
    });
  }

  // ====== Smooth Scrolling for Navbar Links ======
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ====== Popup Function ======
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
    setTimeout(() => (popup.style.opacity = "1"), 100);
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 300);
    }, 2000);
  }
});
