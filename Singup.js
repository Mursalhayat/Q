const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const loginBtn = document.getElementById("login");
    const registerBtn = document.getElementById("register");

    // Function to switch to Sign In
    function showSignIn() {
        container.classList.remove("active");
    }

    // Function to switch to Sign Up
    function showSignUp() {
        container.classList.add("active");
    }

    // Get URL parameters to check if user wants to see Sign In or Sign Up
    const urlParams = new URLSearchParams(window.location.search);
    const showForm = urlParams.get("show");

    if (showForm === "signup") {
        showSignUp();
    } else {
        showSignIn(); // Default to Sign In
    }

    // Add event listeners for switching forms
    loginBtn.addEventListener("click", showSignIn);
    registerBtn.addEventListener("click", showSignUp);
});
