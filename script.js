// App State
let isVisible = true;
let currentView = 'home';

// DOM Elements
const toggleBtn = document.getElementById('toggle-visibility');
const wealthAmount = document.getElementById('wealth-amount');
const eyeIcon = document.getElementById('eye-icon');
const pageTitle = document.getElementById('page-title');
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');

// Wealth values for different states
const wealthValues = {
  visible: '456.00',
  hidden: '•••••'
};

// Page titles for different views
const pageTitles = {
  home: 'Home',
  cash: 'Cash',
  investments: 'Investments', 
  savings: 'Savings',
  advisory: 'Advisory'
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeWealthToggle();
  initializeGameFeatures();
});

// Wealth visibility toggle
function initializeWealthToggle() {
  if (toggleBtn && wealthAmount && eyeIcon) {
    toggleBtn.addEventListener('click', () => {
      isVisible = !isVisible;
      wealthAmount.textContent = isVisible ? wealthValues.visible : wealthValues.hidden;
      eyeIcon.className = isVisible ? 'fas fa-eye' : 'fas fa-eye-slash';
      
      // Add animation effect
      wealthAmount.style.transform = 'scale(0.8)';
      setTimeout(() => {
        wealthAmount.style.transform = 'scale(1)';
      }, 150);
    });
  }
}

// Navigation system
function initializeNavigation() {
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      if (targetView && targetView !== currentView) {
        switchView(targetView);
      }
    });
  });
}

function switchView(viewName) {
  // Update current view
  currentView = viewName;
  
  // Hide all views
  views.forEach(view => {
    view.classList.remove('active');
  });
  
  // Show target view
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.add('active');
  }
  
  // Update navigation buttons
  navButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active');
    }
  });
  
  // Update page title
  if (pageTitle && pageTitles[viewName]) {
    pageTitle.textContent = pageTitles[viewName];
  }
  
  // Load view-specific content
  loadViewContent(viewName);
}

// Load content for specific views
function loadViewContent(viewName) {
  switch(viewName) {
    case 'cash':
      animateCashBalance();
      break;
    case 'investments':
      animateInvestmentCards();
      break;
    case 'savings':
      updateSavingsProgress();
      break;
    case 'advisory':
      loadAdvisoryTips();
      break;
  }
}

// Cash view animations
function animateCashBalance() {
  const balanceElement = document.querySelector('.amount');
  if (balanceElement) {
    balanceElement.style.transform = 'scale(0.8)';
    setTimeout(() => {
      balanceElement.style.transform = 'scale(1)';
    }, 300);
  }
}

// Investment cards animation
function animateInvestmentCards() {
  const investmentCards = document.querySelectorAll('.investment-card');
  investmentCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Savings progress update
function updateSavingsProgress() {
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    progressFill.style.width = '0%';
    setTimeout(() => {
      progressFill.style.width = '60%';
    }, 500);
  }
}

// Advisory tips loader
function loadAdvisoryTips() {
  const adviceItems = document.querySelectorAll('.advice-item');
  adviceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.4s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, index * 200);
  });
}

// Game features initialization
function initializeGameFeatures() {
  // Investment card click handlers
  const investmentCards = document.querySelectorAll('.investment-card');
  investmentCards.forEach(card => {
    card.addEventListener('click', () => {
      showInvestmentDetail(card);
    });
  });
  
  // Action button handlers
  const actionButtons = document.querySelectorAll('.action-btn');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      handleActionClick(e.target);
    });
  });
  
  // Contact advisor button
  const contactBtn = document.querySelector('.contact-advisor');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      showSquidGameAlert('🎭 Front Man says: "The games have begun. Your financial strategy will determine your survival."');
    });
  }
  
  // Help button
  const helpBtn = document.querySelector('.help-btn');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      showSquidGameAlert('❓ Welcome to the Financial Games! Navigate wisely, invest strategically, and remember - every decision has consequences.');
    });
  }
}

// Investment detail modal
function showInvestmentDetail(card) {
  const shape = card.querySelector('.shape').textContent;
  const type = card.querySelector('h4').textContent;
  const returnRate = card.querySelector('.return').textContent;
  
  const messages = {
    '●': 'Circle game: Safe but steady. Like hiding behind others in Red Light, Green Light.',
    '▲': 'Triangle game: Moderate risk. Guards in training - powerful but unpredictable.',
    '★': 'Star game: High reward potential. VIP level access to exclusive opportunities.',
    '☂': 'Umbrella game: Maximum risk. Only for those brave enough to face the final challenges.'
  };
  
  showSquidGameAlert(`${shape} ${type}\nReturn: ${returnRate}\n\n${messages[shape] || 'Strategic investment choice.'}`);
}

// Action button handler
function handleActionClick(button) {
  const isGreen = button.classList.contains('green');
  const action = isGreen ? 'Deposit' : 'Withdraw';
  const message = isGreen 
    ? '💰 Player deposit successful! Your survival fund grows stronger.'
    : '🔴 Withdrawal initiated. Remember: In the games, every won counts.';
  
  // Add visual feedback
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
    showSquidGameAlert(message);
  }, 150);
}

// Squid Game themed alert system
function showSquidGameAlert(message) {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  `;
  
  // Create modal content
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 2px solid #ff4757;
    border-radius: 16px;
    padding: 2rem;
    max-width: 320px;
    margin: 1rem;
    text-align: center;
    box-shadow: 0 20px 40px rgba(255, 71, 87, 0.3);
    animation: modalSlideIn 0.3s ease-out;
  `;
  
  // Add animation keyframes
  if (!document.querySelector('#modal-animations')) {
    const style = document.createElement('style');
    style.id = 'modal-animations';
    style.textContent = `
      @keyframes modalSlideIn {
        from { 
          opacity: 0; 
          transform: translateY(-50px) scale(0.8); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  modal.innerHTML = `
    <div style="color: #fff; font-size: 1rem; line-height: 1.5; margin-bottom: 1.5rem; white-space: pre-line;">
      ${message}
    </div>
    <button style="
      background: #ff4757;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    " onmouseover="this.style.background='#ff3742'" onmouseout="this.style.background='#ff4757'">
      OK
    </button>
  `;
  
  // Add click handlers
  const closeBtn = modal.querySelector('button');
  closeBtn.addEventListener('click', () => {
    overlay.remove();
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
  
  // Add to DOM
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// Auto-update features
setInterval(() => {
  // Randomly update investment returns (simulation)
  const returnElements = document.querySelectorAll('.return');
  returnElements.forEach(element => {
    if (Math.random() < 0.1) { // 10% chance every interval
      const currentValue = parseFloat(element.textContent.replace('%', ''));
      const change = (Math.random() - 0.5) * 0.4; // ±0.2% change
      const newValue = Math.max(0, currentValue + change);
      element.textContent = `+${newValue.toFixed(1)}%`;
      
      // Visual feedback for changes
      element.style.color = change > 0 ? '#2ed573' : '#ff4757';
      setTimeout(() => {
        element.style.color = '#2ed573';
      }, 2000);
    }
  });
}, 5000); // Update every 5 seconds

// Easter egg: Konami code for special Squid Game message
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
  konamiSequence.push(e.code);
  if (konamiSequence.length > konamiCode.length) {
    konamiSequence.shift();
  }
  
  if (konamiSequence.join(',') === konamiCode.join(',')) {
    showSquidGameAlert('🎮 EASTER EGG ACTIVATED!\n\n🔺🔴🟢 You found the secret Squid Game code!\n\nPlayer #456 status: UNLOCKED\nSpecial privileges granted!\n\n"The games never truly end... they just evolve."');
    konamiSequence = [];
  }
});
