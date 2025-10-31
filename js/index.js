document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const getStartedBtn = document.getElementById("getStartedBtn");
  const viewButtons = document.querySelectorAll(".view-btn");
  const contactForm = document.getElementById("contactForm");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  if (viewButtons.length > 0) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        showPopup("More details feature coming soon!");
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      let isValid = true;

      if (name === "") {
        showError("name", "Please Enter your Name.");
        isValid = false;
      } else if (!/^[A-Za-z ]+$/.test(name)) {
        showError("name", "Name should only contain letters and spaces.");
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        showError("email", "Please Enter your Email Address.");
        isValid = false;
      } else if (!email.match(emailPattern)) {
        showError("email", "Please Enter a valid Email Address.");
        isValid = false;
      }

      if (message === "") {
        showError("message", "Please Write your Message before Sending.");
        isValid = false;
      }
      if (isValid) {
        showPopup(`Thank you, ${name}! Your message has been sent successfully.`);
        contactForm.reset();
      }
    });
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let errorDiv = document.getElementById(`${fieldId}Error`);

    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.id = `${fieldId}Error`;
      errorDiv.className = "error-message";
      errorDiv.style.color = "#d9534f";
      errorDiv.style.fontSize = "0.9rem";
      errorDiv.style.marginTop = "4px";
      field.insertAdjacentElement("afterend", errorDiv);
    }

    errorDiv.textContent = message;
    field.classList.add("error-input");
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((msg) => msg.remove());
    document.querySelectorAll(".error-input").forEach((el) =>
      el.classList.remove("error-input")
    );
  }

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
