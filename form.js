const coBtn = document.querySelector('.co');
const connection = document.querySelector('.connection');
const overlay = document.querySelector('.connection-overlay');
const closeBtn = document.querySelector('.close-btn');

const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// ouvrir le formulaire
coBtn.addEventListener('click', () => {
  connection.style.display = 'block';
  overlay.style.display = 'block';
});

// fermer (fond ou croix)
[closeBtn, overlay].forEach(el =>
  el.addEventListener('click', () => {
    connection.style.display = 'none';
    overlay.style.display = 'none';
  })
);

// changer d’onglet
loginTab.addEventListener('click', () => {
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
});

registerTab.addEventListener('click', () => {
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
});
