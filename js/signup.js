document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    let isValid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    // ---- Full Name Validation ----
    if (fullname === "") {
        showError("nameError", "Name cannot be empty");
        isValid = false;
    } else if (!/^[A-Za-z ]+$/.test(fullname)) {
        showError("nameError", "Name must contain only letters");
        isValid = false;
    }

    // ---- Email Validation ----
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
        showError("emailError", "Email cannot be empty");
        isValid = false;
    } else if (!email.match(emailPattern)) {
        showError("emailError", "Please enter a valid email address");
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

    // ---- If Valid ----
    if (isValid) {
        alert("Account created successfully!");
        document.getElementById("signupForm").reset();
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    }
});

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
