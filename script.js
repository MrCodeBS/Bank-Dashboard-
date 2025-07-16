const toggleBtn = document.getElementById('toggle-visibility');
const wealthAmount = document.getElementById('wealth-amount');
const eyeIcon = document.getElementById('eye-icon');

let isVisible = true;

toggleBtn.addEventListener('click', () => {
  isVisible = !isVisible;
  wealthAmount.textContent = isVisible ? '500.00' : '•••••';
  eyeIcon.className = isVisible ? 'fas fa-eye' : 'fas fa-eye-slash';
});
