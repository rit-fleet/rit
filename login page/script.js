// Get the login and registration forms
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Get the register and login links
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

// Initialize an empty object to store the users
let users = {};

// Load users from JSON file
loadUsers();

// Add event listeners to the links
registerLink.addEventListener('click', () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

loginLink.addEventListener('click', () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Add event listener to the register form submission
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  // Store the new user in the users object
  users[email] = password;

  // Save users to JSON file
  saveUsers();

  // Clear the form fields
  document.getElementById('register-email').value = '';
  document.getElementById('register-password').value = '';

  // Display a success message
  alert('Registration successful!');
});

// Add event listener to the login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Check if the user exists and the password matches
  if (users[email] && users[email] === password) {
    // Login successful, redirect to the main page
    window.location.href = 'main-page.html';
  } else {
    // Display an error message
    alert('Invalid email or password');
  }
});

// Load users from JSON file
function loadUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'users.json', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      users = JSON.parse(xhr.responseText);
    }
  };
  xhr.send();
}

// Save users to JSON file
function saveUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', 'users.json', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(users));
}