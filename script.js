// App State
let isVisible = true;
let currentView = 'home';
let gameInitialized = {}; // Track which games are already initialized
let playerStats = {
  survivorPoints: 0,
  gamesWon: 0,
  totalEarnings: 0,
  level: 1
};

// DOM Elements
const toggleBtn = document.getElementById('toggle-visibility');
const wealthAmount = document.getElementById('wealth-amount');
const eyeIcon = document.getElementById('eye-icon');
const pageTitle = document.getElementById('page-title');
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');

// Wealth values for different states
const wealthValues = {
  visible: () => (456.00 + (playerStats.totalEarnings / 1000000)).toFixed(2), // Convert Won to CHF-like display
  hidden: '•••••'
};

// Base cash amount
const baseCashAmount = 456000000; // Starting amount in Korean Won

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
  initializeProfileButton();
  updateStatsDisplay(); // Initialize stats display
  updateAvailableCash(); // Initialize cash display
  updateWealthDisplay(); // Initialize wealth display
});

// Update Player Stats Display
function updateStatsDisplay() {
  const survivorPointsEl = document.getElementById('survivor-points');
  const totalEarningsEl = document.getElementById('total-earnings');
  const gamesWonEl = document.getElementById('games-won');
  const playerLevelEl = document.getElementById('player-level');
  
  // Only update if elements exist (since stats panel might be removed)
  if (survivorPointsEl) {
    survivorPointsEl.textContent = playerStats.survivorPoints.toLocaleString();
  }
  if (totalEarningsEl) {
    totalEarningsEl.textContent = `₩${playerStats.totalEarnings.toLocaleString()}`;
  }
  if (gamesWonEl) {
    gamesWonEl.textContent = playerStats.gamesWon;
  }
  if (playerLevelEl) {
    // Calculate level based on survivor points (every 1000 points = 1 level)
    const newLevel = Math.floor(playerStats.survivorPoints / 1000) + 1;
    playerStats.level = newLevel;
    playerLevelEl.textContent = newLevel;
  }
  
  // Add visual feedback when stats update (only if panel exists)
  const statsPanel = document.querySelector('.stats-panel');
  if (statsPanel && playerStats.survivorPoints > 0) {
    statsPanel.style.borderColor = '#2ed573';
    setTimeout(() => {
      statsPanel.style.borderColor = '#ff4757';
    }, 1000);
  }
  
  // Update other displays when stats change
  updateAvailableCash();
  updateWealthDisplay();
}

// Update Available Cash Display
function updateAvailableCash() {
  const availableCashEl = document.getElementById('available-cash');
  if (availableCashEl) {
    const currentCash = baseCashAmount + playerStats.totalEarnings;
    availableCashEl.textContent = `₩${currentCash.toLocaleString()}`;
  }
}

// Update Wealth Display
function updateWealthDisplay() {
  const wealthAmountEl = document.getElementById('wealth-amount');
  if (wealthAmountEl && isVisible) {
    wealthAmountEl.textContent = wealthValues.visible();
  }
}

// Initialize Profile Button
function initializeProfileButton() {
  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      showProfileModal();
    });
  }
}

// Show Profile Modal with Player Stats
function showProfileModal() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  `;
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 3px solid #ff4757;
    border-radius: 20px;
    padding: 2rem;
    max-width: 400px;
    margin: 1rem;
    text-align: center;
    animation: modalSlideIn 0.3s ease-out;
    box-shadow: 0 20px 40px rgba(255, 71, 87, 0.3);
  `;
  
  // Calculate survival rate
  const totalGamesPlayed = playerStats.gamesWon + Math.floor(playerStats.survivorPoints / 100); // Rough estimate
  const survivalRate = totalGamesPlayed > 0 ? Math.round((playerStats.gamesWon / totalGamesPlayed) * 100) : 100;
  
  modal.innerHTML = `
    <div style="color: #ff4757; font-size: 2rem; margin-bottom: 1rem;">
      <i class="fas fa-user-circle"></i>
    </div>
    
    <h2 style="color: #ff4757; margin: 0 0 0.5rem 0; font-size: 1.5rem;">
      Player #456 Profile
    </h2>
    
    <div style="color: #ccc; margin-bottom: 2rem; font-size: 0.9rem;">
      "In this game, survival is everything."
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0;">
      <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,71,87,0.2);">
        <div style="color: #ff4757; font-size: 1.5rem;">🏆</div>
        <div style="color: #fff; font-weight: 700; font-size: 1.1rem;">${playerStats.survivorPoints.toLocaleString()}</div>
        <div style="color: #ccc; font-size: 0.8rem;">Survivor Points</div>
      </div>
      
      <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,71,87,0.2);">
        <div style="color: #ff4757; font-size: 1.5rem;">💰</div>
        <div style="color: #fff; font-weight: 700; font-size: 1.1rem;">₩${playerStats.totalEarnings.toLocaleString()}</div>
        <div style="color: #ccc; font-size: 0.8rem;">Total Earnings</div>
      </div>
      
      <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,71,87,0.2);">
        <div style="color: #ff4757; font-size: 1.5rem;">🎯</div>
        <div style="color: #fff; font-weight: 700; font-size: 1.1rem;">${playerStats.gamesWon}</div>
        <div style="color: #ccc; font-size: 0.8rem;">Games Won</div>
      </div>
      
      <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,71,87,0.2);">
        <div style="color: #ff4757; font-size: 1.5rem;">⭐</div>
        <div style="color: #fff; font-weight: 700; font-size: 1.1rem;">Level ${playerStats.level}</div>
        <div style="color: #ccc; font-size: 0.8rem;">Player Level</div>
      </div>
    </div>
    
    <div style="background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 8px; margin: 1rem 0; border: 1px solid rgba(255,71,87,0.3);">
      <div style="color: #ff4757; font-weight: 600; margin-bottom: 0.5rem;">💀 Survival Statistics</div>
      <div style="color: #fff;">Survival Rate: <span style="color: #2ed573; font-weight: 700;">${survivalRate}%</span></div>
      <div style="color: #ccc; font-size: 0.8rem; margin-top: 0.5rem;">
        Available Cash: ₩${(baseCashAmount + playerStats.totalEarnings).toLocaleString()}
      </div>
    </div>
    
    <button id="close-profile" style="
      background: linear-gradient(45deg, #ff4757, #ff6b6b);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      width: 100%;
    ">Close Profile</button>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Add click handlers
  const closeBtn = modal.querySelector('#close-profile');
  closeBtn.addEventListener('click', () => {
    overlay.remove();
  });
  
  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.style.background = 'linear-gradient(45deg, #ff3742, #ff5252)';
    if (window.gameAudio) window.gameAudio.beep();
  });
  
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.style.background = 'linear-gradient(45deg, #ff4757, #ff6b6b)';
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}

// Wealth visibility toggle
function initializeWealthToggle() {
  if (toggleBtn && wealthAmount && eyeIcon) {
    toggleBtn.addEventListener('click', () => {
      isVisible = !isVisible;
      wealthAmount.textContent = isVisible ? wealthValues.visible() : wealthValues.hidden;
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
      if (!gameInitialized.redLight) {
        initializeRedLightGreenLightGame();
        gameInitialized.redLight = true;
      }
      break;
    case 'investments':
      animateInvestmentCards();
      if (!gameInitialized.honeycomb) {
        initializeHoneycombGame();
        gameInitialized.honeycomb = true;
      }
      break;
    case 'savings':
      updateSavingsProgress();
      if (!gameInitialized.glassBridge) {
        initializeGlassBridgeGame();
        gameInitialized.glassBridge = true;
      }
      break;
    case 'advisory':
      loadAdvisoryTips();
      if (!gameInitialized.frontMan) {
        initializeFrontManAdvice();
        gameInitialized.frontMan = true;
      }
      break;
  }
}

// Cash view animations
function animateCashBalance() {
  // Update available cash first
  updateAvailableCash();
  
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
  console.log('Found investment cards:', investmentCards.length); // Debug log
  
  // Simple approach - just make sure they're visible
  investmentCards.forEach((card, index) => {
    card.style.display = 'block';
    card.style.visibility = 'visible';
    card.style.opacity = '1';
    card.style.transform = 'none';
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

// Glass Bridge Savings Game
function initializeGlassBridgeGame() {
  const bridgeSteps = document.querySelectorAll('.bridge-step');
  
  bridgeSteps.forEach((step, index) => {
    step.addEventListener('click', () => {
      startGlassBridgeChallenge(step, index);
    });
    
    // Add hover effects
    step.addEventListener('mouseenter', () => {
      if (!step.classList.contains('completed')) {
        step.style.transform = 'scale(1.1)';
        if (window.gameAudio) window.gameAudio.beep();
      }
    });
    
    step.addEventListener('mouseleave', () => {
      step.style.transform = 'scale(1)';
    });
  });
  
  // Check if bridge game button already exists to prevent duplicates
  const existingBridgeBtn = document.querySelector('.bridge-game-btn');
  if (existingBridgeBtn) {
    return; // Exit if button already exists
  }
  
  // Add glass bridge game button
  const savingsSection = document.querySelector('#savings-view .game-section');
  if (savingsSection) {
    const bridgeGameBtn = document.createElement('button');
    bridgeGameBtn.textContent = '🌉 Start Glass Bridge Challenge';
    bridgeGameBtn.className = 'bridge-game-btn';
    bridgeGameBtn.style.cssText = `
      background: linear-gradient(45deg, #3742fa, #5352ed);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin: 1rem 0;
      width: 100%;
      transition: all 0.3s;
    `;
    
    savingsSection.appendChild(bridgeGameBtn);
    
    bridgeGameBtn.addEventListener('click', () => {
      startFullGlassBridgeGame();
    });
  }
}

function startGlassBridgeChallenge(step, index) {
  const isCorrect = Math.random() > 0.3; // 70% chance of success
  
  if (isCorrect) {
    step.classList.add('completed');
    step.style.background = '#2ed573';
    step.style.borderColor = '#2ed573';
    if (window.gameAudio) window.gameAudio.success();
    
    showSquidGameAlert(`✅ Safe step!\n\nYou've successfully crossed step ${index + 1}!\n\n+₩100,000 added to savings!`);
    
    // Update player stats
    playerStats.totalEarnings += 100000;
    playerStats.survivorPoints += 50; // 50 points per successful bridge step
    updateStatsDisplay();
    
    // Update progress
    updateSavingsAmount(100000);
  } else {
    step.style.background = '#ff4757';
    step.style.animation = 'crack 0.5s ease-out';
    if (window.gameAudio) window.gameAudio.error();
    
    setTimeout(() => {
      step.style.background = '#333';
      step.style.animation = '';
    }, 1000);
    
    showSquidGameAlert(`💥 Glass shattered!\n\nThat was a tempered glass panel!\n\nTry a different approach to saving.`);
  }
}

function startFullGlassBridgeGame() {
  showSquidGameAlert(`🌉 GLASS BRIDGE SAVINGS GAME\n\n🎯 Rules:\n• Choose the correct glass panels\n• Each success adds to your savings\n• Wrong choice = restart\n• Complete the bridge to unlock bonus!\n\nReady to begin?`);
  
  // Reset all steps
  const bridgeSteps = document.querySelectorAll('.bridge-step');
  bridgeSteps.forEach(step => {
    step.classList.remove('completed', 'current');
    step.style.background = '#333';
    step.style.borderColor = '#333';
  });
  
  // Start from first step
  if (bridgeSteps.length > 0) {
    bridgeSteps[0].classList.add('current');
  }
}

function updateSavingsAmount(amount) {
  const progressAmount = document.querySelector('.progress-amount');
  if (progressAmount) {
    const currentText = progressAmount.textContent;
    const currentAmount = parseInt(currentText.match(/₩([\d,]+)/)[1].replace(',', ''));
    const newAmount = currentAmount + amount;
    progressAmount.textContent = `₩${newAmount.toLocaleString()} / ₩500,000`;
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    const percentage = Math.min((newAmount / 500000) * 100, 100);
    progressFill.style.width = `${percentage}%`;
  }
}

// Front Man Conversation System
function startFrontManConversation() {
  const conversations = [
    {
      message: "🎭 Welcome, Player. I see you're interested in financial advice.",
      responses: ["Tell me about investments", "How can I save more?", "What are the risks?"]
    },
    {
      message: "💰 Investments are like games - some you win, some you lose. But the house always has an edge.",
      responses: ["Show me the best strategy", "I want high returns", "Play it safe"]
    },
    {
      message: "🎯 High returns require high risks. Are you prepared to play the ultimate game?",
      responses: ["I'm ready for anything", "Maybe something safer", "What's the ultimate game?"]
    }
  ];
  
  startConversationFlow(conversations, 0);
}

function startConversationFlow(conversations, index) {
  if (index >= conversations.length) {
    showSquidGameAlert("🎭 Remember: In the end, only the smartest players survive.\n\nYour financial journey continues...");
    return;
  }
  
  const conv = conversations[index];
  showConversationModal(conv.message, conv.responses, (choice) => {
    handleFrontManResponse(choice, index, conversations);
  });
}

function showConversationModal(message, responses, callback) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  `;
  
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 3px solid #ff4757;
    border-radius: 20px;
    padding: 2rem;
    max-width: 400px;
    margin: 1rem;
    text-align: center;
    animation: modalSlideIn 0.3s ease-out;
  `;
  
  let buttonsHtml = '';
  responses.forEach((response, index) => {
    buttonsHtml += `
      <button data-choice="${index}" style="
        background: linear-gradient(45deg, #ff4757, #ff6b6b);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        margin: 0.5rem;
        transition: all 0.3s;
        display: block;
        width: 100%;
      ">${response}</button>
    `;
  });
  
  modal.innerHTML = `
    <div style="color: #fff; font-size: 1.1rem; line-height: 1.5; margin-bottom: 2rem;">
      ${message}
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      ${buttonsHtml}
    </div>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Add click handlers
  modal.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const choice = parseInt(e.target.getAttribute('data-choice'));
      overlay.remove();
      callback(choice);
    });
    
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'linear-gradient(45deg, #ff3742, #ff5252)';
      if (window.gameAudio) window.gameAudio.beep();
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'linear-gradient(45deg, #ff4757, #ff6b6b)';
    });
  });
}

function handleFrontManResponse(choice, conversationIndex, conversations) {
  const responses = [
    [
      "🎯 Investments: Like choosing between honeycomb shapes, each has its risk.",
      "💰 Saving: Small, consistent steps - like crossing the glass bridge.",
      "⚠️ Risks: Every game has elimination. Choose wisely."
    ],
    [
      "📈 Strategy: Diversification is survival. Never put all chips on one game.",
      "🔥 High returns: The tug-of-war approach - high risk, high reward.",
      "🛡️ Safe play: Like hiding in Red Light Green Light - slow but steady."
    ],
    [
      "🎮 Excellent. Your next challenge awaits in the investment section.",
      "✅ Wise choice. Check the savings game for safer growth.",
      "🎭 The ultimate game is life itself. Every financial decision shapes your survival."
    ]
  ];
  
  const responseMessage = responses[conversationIndex][choice];
  
  setTimeout(() => {
    showSquidGameAlert(responseMessage);
    setTimeout(() => {
      startConversationFlow(conversations, conversationIndex + 1);
    }, 3000);
  }, 1000);
}

// Enhanced Front Man advice system
function initializeFrontManAdvice() {
  const adviceItems = document.querySelectorAll('.advice-item');
  adviceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    // Make advice items interactive
    item.addEventListener('click', () => {
      showAdviceDetail(item, index);
    });
    
    setTimeout(() => {
      item.style.transition = 'all 0.4s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
      item.style.cursor = 'pointer';
    }, index * 200);
  });
}

function showAdviceDetail(item, index) {
  const adviceDetails = [
    "🎯 Diversification Strategy:\n\nLike spreading players across different games, diversify your investments across different asset classes. No single investment should determine your financial survival.",
    "⚠️ Risk Management:\n\nHigh-risk investments are like the glass bridge - one wrong step can be costly. Always have a safety net and never invest more than you can afford to lose.",
    "💡 Long-term Planning:\n\nThe players who survived had strategy, not just luck. Set clear financial goals and stick to your plan, even when emotions run high."
  ];
  
  if (window.gameAudio) window.gameAudio.click();
  showSquidGameAlert(adviceDetails[index]);
}

// Game instructions
function showGameInstructions() {
  showSquidGameAlert(`🎮 SQUID GAME FINANCIAL DASHBOARD\n\n🔴🟢 RED LIGHT GREEN LIGHT (Cash):\nTiming-based deposit/withdrawal game\n\n🍯 HONEYCOMB (Investments):\nSkill-based investment challenges\n\n🌉 GLASS BRIDGE (Savings):\nStep-by-step savings progression\n\n🎭 FRONT MAN (Advisory):\nInteractive financial advice\n\nTip: Press 'S' for quick test, or try the Konami code!`);
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
      startFrontManConversation();
    });
  }
  
  // Help button
  const helpBtn = document.querySelector('.help-btn');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      showGameInstructions();
    });
  }
  
  // Initialize sound system
  initializeSoundEffects();
}

// Sound effects system
function initializeSoundEffects() {
  // Create audio context for sound effects
  window.gameAudio = {
    beep: () => playTone(800, 100),
    success: () => playTone(600, 200),
    error: () => playTone(200, 300),
    click: () => playTone(400, 50)
  };
}

function playTone(frequency, duration) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (e) {
    console.log('Audio not supported');
  }
}

// Red Light Green Light Cash Game - ENHANCED VERSION
function initializeRedLightGreenLightGame() {
  const depositBtn = document.querySelector('.action-btn.green');
  const withdrawBtn = document.querySelector('.action-btn.red');
  
  if (!depositBtn || !withdrawBtn) return;
  
  // Create game interface
  const gameContainer = createGameContainer('cash');
  const gameSection = document.querySelector('#cash-view .game-section');
  if (gameSection && !gameSection.querySelector('.enhanced-game-container')) {
    gameSection.appendChild(gameContainer);
  }
  
  let gameState = {
    active: false,
    phase: 'green',
    score: 0,
    level: 1,
    timeLeft: 30,
    transactions: 0,
    goal: 5, // Complete 5 transactions to win
    lives: 3,
    earnings: 0
  };
  
  const startBtn = gameContainer.querySelector('.start-game-btn');
  const scoreDisplay = gameContainer.querySelector('.score-display');
  const goalDisplay = gameContainer.querySelector('.goal-display');
  const livesDisplay = gameContainer.querySelector('.lives-display');
  const timerDisplay = gameContainer.querySelector('.timer-display');
  
  updateGameDisplay();
  
  startBtn.addEventListener('click', () => {
    if (!gameState.active) {
      startGame();
    } else {
      endGame();
    }
  });
  
  function startGame() {
    gameState.active = true;
    gameState.score = 0;
    gameState.transactions = 0;
    gameState.timeLeft = 30;
    gameState.lives = 3;
    gameState.earnings = 0;
    
    startBtn.textContent = '⏹️ End Game';
    updateGameDisplay();
    
    showSquidGameAlert(`🎮 RED LIGHT GREEN LIGHT CHALLENGE\n\n🎯 GOAL: Complete ${gameState.goal} transactions in 30 seconds\n\n🟢 GREEN = Deposit/Withdraw allowed\n🔴 RED = FREEZE! Movement = Death!\n\n💰 Earn ₩10,000 per successful transaction\n❤️ 3 Lives - Don't move during RED!\n\nReady, Player #456?`);
    
    setTimeout(() => {
      gameLoop();
      countdown();
    }, 3000);
  }
  
  function gameLoop() {
    if (!gameState.active) return;
    
    // Random phase changes (2-4 seconds)
    const nextPhaseTime = Math.random() * 2000 + 2000;
    
    setTimeout(() => {
      gameState.phase = gameState.phase === 'green' ? 'red' : 'green';
      updateButtonStates();
      
      if (window.gameAudio) {
        gameState.phase === 'red' ? window.gameAudio.error() : window.gameAudio.success();
      }
      
      if (gameState.active) {
        gameLoop(); // Continue the game loop
      }
    }, nextPhaseTime);
  }
  
  function countdown() {
    if (!gameState.active || gameState.timeLeft <= 0) {
      checkGameEnd();
      return;
    }
    
    gameState.timeLeft--;
    updateGameDisplay();
    
    setTimeout(countdown, 1000);
  }
  
  function updateButtonStates() {
    if (gameState.phase === 'red') {
      depositBtn.style.background = '#666';
      withdrawBtn.style.background = '#666';
      depositBtn.style.pointerEvents = 'none';
      withdrawBtn.style.pointerEvents = 'none';
      depositBtn.textContent = '🔴 FREEZE!';
      withdrawBtn.textContent = '🔴 FREEZE!';
      
      // Add danger indicators
      depositBtn.style.boxShadow = '0 0 20px #ff4757';
      withdrawBtn.style.boxShadow = '0 0 20px #ff4757';
    } else {
      depositBtn.style.background = '#2ed573';
      withdrawBtn.style.background = '#ff4757';
      depositBtn.style.pointerEvents = 'auto';
      withdrawBtn.style.pointerEvents = 'auto';
      depositBtn.textContent = '🟢 Quick Deposit!';
      withdrawBtn.textContent = '🟢 Quick Withdraw!';
      
      // Remove danger indicators
      depositBtn.style.boxShadow = 'none';
      withdrawBtn.style.boxShadow = 'none';
    }
  }
  
  function handleTransaction(type) {
    if (!gameState.active || gameState.phase === 'red') {
      // Player moved during red light - lose a life!
      gameState.lives--;
      if (window.gameAudio) window.gameAudio.error();
      
      showSquidGameAlert(`💀 ELIMINATED!\n\nYou moved during RED LIGHT!\n\nLives remaining: ${gameState.lives}`);
      
      if (gameState.lives <= 0) {
        endGame(false);
        return;
      }
      
      updateGameDisplay();
      return;
    }
    
    // Successful transaction during green light
    gameState.transactions++;
    gameState.score += 100;
    gameState.earnings += 10000;
    
    if (window.gameAudio) window.gameAudio.success();
    
    // Visual feedback
    const btn = type === 'deposit' ? depositBtn : withdrawBtn;
    btn.style.transform = 'scale(1.1)';
    btn.style.background = '#2ed573';
    
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
      updateButtonStates();
    }, 200);
    
    updateGameDisplay();
    
    // Check if goal reached
    if (gameState.transactions >= gameState.goal) {
      endGame(true);
    }
  }
  
  function checkGameEnd() {
    if (gameState.transactions >= gameState.goal) {
      endGame(true);
    } else {
      endGame(false);
    }
  }
  
  function endGame(won = false) {
    gameState.active = false;
    startBtn.textContent = '🎮 Start New Game';
    
    // Reset button states
    depositBtn.style.background = '#2ed573';
    withdrawBtn.style.background = '#ff4757';
    depositBtn.style.pointerEvents = 'auto';
    withdrawBtn.style.pointerEvents = 'auto';
    depositBtn.textContent = 'Deposit';
    withdrawBtn.textContent = 'Withdraw';
    depositBtn.style.boxShadow = 'none';
    withdrawBtn.style.boxShadow = 'none';
    
    if (won) {
      playerStats.gamesWon++;
      playerStats.survivorPoints += gameState.score;
      playerStats.totalEarnings += gameState.earnings;
      
      // Update stats display
      updateStatsDisplay();
      
      showSquidGameAlert(`🎉 WINNER WINNER!\n\n✅ Goal Achieved: ${gameState.transactions}/${gameState.goal} transactions\n💰 Earnings: ₩${gameState.earnings.toLocaleString()}\n🏆 Score: ${gameState.score} points\n⭐ Survivor Points: +${gameState.score}\n\nYou survived Player #456!`);
    } else {
      showSquidGameAlert(`💀 GAME OVER\n\n❌ Goal Failed: ${gameState.transactions}/${gameState.goal} transactions\n⏰ Time: ${gameState.timeLeft}s remaining\n❤️ Lives: ${gameState.lives}\n\n"In the game of money, timing is everything."\n\nTry again, Player #456?`);
    }
    
    updateGameDisplay();
  }
  
  function updateGameDisplay() {
    scoreDisplay.textContent = `Score: ${gameState.score}`;
    goalDisplay.textContent = `Goal: ${gameState.transactions}/${gameState.goal}`;
    livesDisplay.textContent = `❤️ ${gameState.lives}`;
    timerDisplay.textContent = `⏰ ${gameState.timeLeft}s`;
  }
  
  // Attach transaction handlers
  depositBtn.addEventListener('click', () => handleTransaction('deposit'));
  withdrawBtn.addEventListener('click', () => handleTransaction('withdraw'));
}

// Game container creation
function createGameContainer(gameType) {
  const container = document.createElement('div');
  container.className = 'enhanced-game-container';
  container.style.cssText = `
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 2px solid #ff4757;
    border-radius: 16px;
    padding: 1.5rem;
    margin: 2rem 0 1rem 0;
    text-align: center;
    position: relative;
    z-index: 5;
  `;
  
  const gameInfo = {
    cash: {
      title: '🚦 Red Light Green Light Challenge',
      description: 'Complete transactions during GREEN phases only!'
    },
    investments: {
      title: '🍯 Honeycomb Investment Challenge', 
      description: 'Master all 4 investment strategies to win!'
    },
    savings: {
      title: '🌉 Glass Bridge Savings Challenge',
      description: 'Cross the bridge safely to unlock your savings!'
    }
  };
  
  const info = gameInfo[gameType];
  
  container.innerHTML = `
    <h3 style="color: #ff4757; margin: 0 0 0.5rem 0;">${info.title}</h3>
    <p style="color: #ccc; margin: 0 0 1rem 0; font-size: 0.9rem;">${info.description}</p>
    
    <div class="game-stats" style="display: flex; justify-content: space-between; margin: 1rem 0; font-size: 0.8rem;">
      <span class="score-display" style="color: #2ed573;">Score: 0</span>
      <span class="goal-display" style="color: #ff6b6b;">Goal: 0/0</span>
      <span class="lives-display" style="color: #ff4757;">❤️ 3</span>
      <span class="timer-display" style="color: #ffa502;">⏰ 30s</span>
    </div>
    
    <button class="start-game-btn" style="
      background: linear-gradient(45deg, #ff4757, #ff6b6b);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: all 0.3s;
      box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
    ">🎮 Start Challenge</button>
  `;
  
  return container;
}

// Enhanced Honeycomb Investment Game
function initializeHoneycombGame() {
  const gameContainer = createGameContainer('investments');
  const investmentSection = document.querySelector('#investments-view .game-section');
  
  // Insert the game container at the beginning of the section, before the investment grid
  if (investmentSection && !investmentSection.querySelector('.enhanced-game-container')) {
    const firstChild = investmentSection.firstChild;
    if (firstChild && firstChild.nextSibling) {
      investmentSection.insertBefore(gameContainer, firstChild.nextSibling);
    } else {
      investmentSection.appendChild(gameContainer);
    }
  }
  
  let gameState = {
    active: false,
    completedShapes: 0,
    goal: 4, // Complete all 4 shapes
    score: 0,
    timeLeft: 60,
    attempts: 0,
    maxAttempts: 6
  };
  
  const startBtn = gameContainer.querySelector('.start-game-btn');
  const scoreDisplay = gameContainer.querySelector('.score-display');
  const goalDisplay = gameContainer.querySelector('.goal-display');
  const livesDisplay = gameContainer.querySelector('.lives-display');
  const timerDisplay = gameContainer.querySelector('.timer-display');
  
  updateHoneycombDisplay();
  
  startBtn.addEventListener('click', () => {
    if (!gameState.active) {
      startHoneycombGame();
    } else {
      endHoneycombGame();
    }
  });
  
  function startHoneycombGame() {
    gameState.active = true;
    gameState.completedShapes = 0;
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.attempts = 0;
    
    startBtn.textContent = '⏹️ End Challenge';
    updateHoneycombDisplay();
    
    showSquidGameAlert(`🍯 HONEYCOMB INVESTMENT CHALLENGE\n\n🎯 GOAL: Complete all 4 investment shapes\n\n● Circle = Click Challenge (Easy)\n▲ Triangle = Hold Challenge (Medium)\n★ Star = Double-click Challenge (Hard)\n☂ Umbrella = Trace Challenge (Expert)\n\n💰 Earn points for each completed shape\n⚠️ 6 attempts maximum\n\nChoose your first investment wisely!`);
    
    // Reset all investment cards
    const investmentCards = document.querySelectorAll('.investment-card');
    investmentCards.forEach(card => {
      card.style.border = '2px solid #333';
      card.style.transform = 'scale(1)';
      card.classList.remove('completed');
    });
    
    setTimeout(() => {
      honeycombCountdown();
    }, 3000);
  }
  
  function honeycombCountdown() {
    if (!gameState.active || gameState.timeLeft <= 0) {
      endHoneycombGame(false);
      return;
    }
    
    gameState.timeLeft--;
    updateHoneycombDisplay();
    
    setTimeout(honeycombCountdown, 1000);
  }
  
  function updateHoneycombDisplay() {
    scoreDisplay.textContent = `Score: ${gameState.score}`;
    goalDisplay.textContent = `Shapes: ${gameState.completedShapes}/${gameState.goal}`;
    livesDisplay.textContent = `🎯 ${gameState.maxAttempts - gameState.attempts}`;
    timerDisplay.textContent = `⏰ ${gameState.timeLeft}s`;
  }
  
  function completeShape(points) {
    gameState.completedShapes++;
    gameState.score += points;
    updateHoneycombDisplay();
    
    if (gameState.completedShapes >= gameState.goal) {
      endHoneycombGame(true);
    }
  }
  
  function failShape() {
    gameState.attempts++;
    updateHoneycombDisplay();
    
    if (gameState.attempts >= gameState.maxAttempts) {
      endHoneycombGame(false);
    }
  }
  
  function endHoneycombGame(won = false) {
    gameState.active = false;
    startBtn.textContent = '🎮 Start New Challenge';
    
    if (won) {
      playerStats.gamesWon++;
      playerStats.survivorPoints += gameState.score;
      
      // Update stats display
      updateStatsDisplay();
      
      showSquidGameAlert(`🎉 HONEYCOMB MASTER!\n\n✅ All shapes completed!\n🏆 Score: ${gameState.score} points\n⭐ Survivor Points: +${gameState.score}\n💰 Investment Portfolio Unlocked!\n\nYou've mastered the art of investment!`);
    } else {
      const reason = gameState.timeLeft <= 0 ? 'Time ran out!' : 'Too many failed attempts!';
      showSquidGameAlert(`💀 HONEYCOMB CRACKED!\n\n❌ ${reason}\n📊 Shapes completed: ${gameState.completedShapes}/${gameState.goal}\n🎯 Attempts used: ${gameState.attempts}/${gameState.maxAttempts}\n\n"Even the best investors fail sometimes."\n\nTry again?`);
    }
  }
  
  // Enhanced investment card interactions
  const investmentCards = document.querySelectorAll('.investment-card');
  investmentCards.forEach((card, index) => {
    // Remove old event listeners and add new ones
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    newCard.addEventListener('click', (e) => {
      e.preventDefault();
      if (gameState.active && !newCard.classList.contains('completed')) {
        startHoneycombChallenge(newCard);
      } else if (!gameState.active) {
        showSquidGameAlert('🍯 Start the Honeycomb Challenge first!\n\nClick the "Start Challenge" button to begin.');
      }
    });
    
    newCard.addEventListener('mouseenter', () => {
      if (gameState.active && !newCard.classList.contains('completed')) {
        newCard.style.transform = 'scale(1.05)';
        if (window.gameAudio) window.gameAudio.beep();
      }
    });
    
    newCard.addEventListener('mouseleave', () => {
      if (!newCard.classList.contains('completed')) {
        newCard.style.transform = 'scale(1)';
      }
    });
  });
  
  // Update the existing honeycomb challenge logic to work with new game state
  window.honeycombGameState = gameState;
  window.completeShape = completeShape;
  window.failShape = failShape;
}

function addCrackEffect(card) {
  const crack = document.createElement('div');
  crack.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 20px;
    background: #ff4757;
    opacity: 0.7;
    z-index: 10;
    animation: crackGrow 0.5s ease-out;
  `;
  
  card.style.position = 'relative';
  card.appendChild(crack);
  
  setTimeout(() => crack.remove(), 1000);
}

function startHoneycombChallenge(card) {
  const shape = card.querySelector('.shape').textContent;
  const difficulty = {
    '●': 'EASY',
    '▲': 'MEDIUM', 
    '★': 'HARD',
    '☂': 'EXPERT'
  };
  
  const challenges = {
    '●': 'Click 3 times quickly!',
    '▲': 'Hold for 3 seconds!',
    '★': 'Double-click 5 times!',
    '☂': 'Trace the shape with your mouse!'
  };
  
  showInteractiveChallenge(shape, difficulty[shape], challenges[shape], card);
}

function showInteractiveChallenge(shape, diff, challenge, card) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  `;
  
  const challengeBox = document.createElement('div');
  challengeBox.style.cssText = `
    background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
    border: 3px solid #ff4757;
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    max-width: 350px;
    animation: challengePopIn 0.5s ease-out;
  `;
  
  challengeBox.innerHTML = `
    <div style="font-size: 4rem; margin-bottom: 1rem;">${shape}</div>
    <h3 style="color: #ff4757; margin: 1rem 0;">Honeycomb Challenge</h3>
    <div style="color: #fff; margin: 1rem 0;">Difficulty: ${diff}</div>
    <div style="color: #ccc; margin: 1.5rem 0; font-size: 1.1rem;">${challenge}</div>
    <div id="challenge-target" style="
      width: 100px;
      height: 100px;
      background: #ff4757;
      margin: 2rem auto;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      user-select: none;
    ">${shape}</div>
    <div id="progress-bar" style="
      width: 100%;
      height: 8px;
      background: #333;
      border-radius: 4px;
      overflow: hidden;
      margin: 1rem 0;
    ">
      <div id="progress-fill" style="
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #2ed573, #7bed9f);
        transition: width 0.3s;
      "></div>
    </div>
    <div id="challenge-status" style="color: #ccc; margin: 1rem 0;">Get ready...</div>
  `;
  
  overlay.appendChild(challengeBox);
  document.body.appendChild(overlay);
  
  // Add challenge mechanics
  setTimeout(() => {
    startChallengeLogic(shape, overlay, card);
  }, 1000);
}

function startChallengeLogic(shape, overlay, originalCard) {
  const target = overlay.querySelector('#challenge-target');
  const progressFill = overlay.querySelector('#progress-fill');
  const status = overlay.querySelector('#challenge-status');
  
  let progress = 0;
  let completed = false;
  
  const challenges = {
    '●': () => clickChallenge(target, progressFill, status),
    '▲': () => holdChallenge(target, progressFill, status),
    '★': () => doubleClickChallenge(target, progressFill, status),
    '☂': () => traceChallenge(target, progressFill, status)
  };
  
  const challengePromise = challenges[shape]();
  
  challengePromise.then((success) => {
    if (success) {
      if (window.gameAudio) window.gameAudio.success();
      status.textContent = '🎉 SUCCESS! Investment unlocked!';
      status.style.color = '#2ed573';
      
      // Add visual success effect
      target.style.background = 'linear-gradient(45deg, #2ed573, #7bed9f)';
      target.style.transform = 'scale(1.2)';
      
      // Calculate points based on difficulty
      const points = {
        '●': 100,  // Easy
        '▲': 200,  // Medium  
        '★': 300,  // Hard
        '☂': 500   // Expert
      };
      
      const earnedPoints = points[shape];
      
      setTimeout(() => {
        overlay.remove();
        
        // Mark card as completed
        originalCard.classList.add('completed');
        originalCard.style.border = '3px solid #2ed573';
        originalCard.style.transform = 'scale(1.05)';
        
        // Update game state if game is active
        if (window.honeycombGameState && window.honeycombGameState.active) {
          window.completeShape(earnedPoints);
          showSquidGameAlert(`🎉 ${shape} Investment Mastered!\n\n💰 Points Earned: ${earnedPoints}\n🎯 Difficulty: ${['●', '▲', '★', '☂'].indexOf(shape) + 1}/4\n\nNext challenge awaits!`);
        } else {
          // Add earnings for individual challenge completion
          playerStats.totalEarnings += earnedPoints * 10000; // Convert points to Korean Won
          updateStatsDisplay();
          
          showSquidGameAlert(`🎉 Honeycomb completed successfully!\n\nYour investment is now active!\n+${earnedPoints} Points earned!\n+₩${(earnedPoints * 10000).toLocaleString()} added to earnings!`);
        }
      }, 2000);
    } else {
      if (window.gameAudio) window.gameAudio.error();
      status.textContent = '💀 FAILED! Try again...';
      status.style.color = '#ff4757';
      
      setTimeout(() => {
        overlay.remove();
        
        // Update game state if game is active
        if (window.honeycombGameState && window.honeycombGameState.active) {
          window.failShape();
          showSquidGameAlert(`💀 ${shape} Investment Failed!\n\nThe honeycomb cracked!\n\n🎯 Attempts remaining: ${window.honeycombGameState.maxAttempts - window.honeycombGameState.attempts}\n\nTry a different strategy!`);
        } else {
          showSquidGameAlert(`💀 Honeycomb cracked!\n\nDon't worry, you can try again.\nBe more careful next time!`);
        }
      }, 2000);
    }
  });
}

function clickChallenge(target, progressFill, status) {
  return new Promise((resolve) => {
    let clicks = 0;
    const requiredClicks = 3;
    let timeLeft = 5;
    
    status.textContent = `Click ${requiredClicks} times! Time: ${timeLeft}s`;
    
    const timer = setInterval(() => {
      timeLeft--;
      status.textContent = `Click ${requiredClicks} times! Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        resolve(false);
      }
    }, 1000);
    
    target.addEventListener('click', () => {
      clicks++;
      progressFill.style.width = `${(clicks / requiredClicks) * 100}%`;
      target.style.transform = 'scale(0.9)';
      if (window.gameAudio) window.gameAudio.click();
      
      setTimeout(() => {
        target.style.transform = 'scale(1)';
      }, 100);
      
      if (clicks >= requiredClicks) {
        clearInterval(timer);
        resolve(true);
      }
    });
  });
}

function holdChallenge(target, progressFill, status) {
  return new Promise((resolve) => {
    let holdTime = 0;
    const requiredTime = 3000; // 3 seconds
    let holding = false;
    let interval;
    
    status.textContent = 'Hold the shape for 3 seconds!';
    
    target.addEventListener('mousedown', () => {
      holding = true;
      target.style.background = '#2ed573';
      if (window.gameAudio) window.gameAudio.beep();
      
      interval = setInterval(() => {
        if (holding) {
          holdTime += 100;
          progressFill.style.width = `${(holdTime / requiredTime) * 100}%`;
          
          if (holdTime >= requiredTime) {
            clearInterval(interval);
            resolve(true);
          }
        }
      }, 100);
    });
    
    target.addEventListener('mouseup', () => {
      holding = false;
      target.style.background = '#ff4757';
      if (holdTime < requiredTime) {
        clearInterval(interval);
        setTimeout(() => resolve(false), 1000);
      }
    });
    
    target.addEventListener('mouseleave', () => {
      holding = false;
      target.style.background = '#ff4757';
      if (holdTime < requiredTime) {
        clearInterval(interval);
        setTimeout(() => resolve(false), 1000);
      }
    });
  });
}

function doubleClickChallenge(target, progressFill, status) {
  return new Promise((resolve) => {
    let doubleClicks = 0;
    const requiredDoubleClicks = 5;
    let timeLeft = 8;
    
    status.textContent = `Double-click ${requiredDoubleClicks} times! Time: ${timeLeft}s`;
    
    const timer = setInterval(() => {
      timeLeft--;
      status.textContent = `Double-click ${requiredDoubleClicks} times! Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        resolve(false);
      }
    }, 1000);
    
    target.addEventListener('dblclick', () => {
      doubleClicks++;
      progressFill.style.width = `${(doubleClicks / requiredDoubleClicks) * 100}%`;
      target.style.background = '#2ed573';
      if (window.gameAudio) window.gameAudio.click();
      
      setTimeout(() => {
        target.style.background = '#ff4757';
      }, 200);
      
      if (doubleClicks >= requiredDoubleClicks) {
        clearInterval(timer);
        resolve(true);
      }
    });
  });
}

function traceChallenge(target, progressFill, status) {
  return new Promise((resolve) => {
    let traced = false;
    let mouseIn = false;
    let traceTime = 0;
    const requiredTime = 2000; // 2 seconds
    
    status.textContent = 'Keep your mouse over the shape for 2 seconds!';
    
    target.addEventListener('mouseenter', () => {
      mouseIn = true;
      target.style.background = '#2ed573';
      
      const interval = setInterval(() => {
        if (mouseIn) {
          traceTime += 100;
          progressFill.style.width = `${(traceTime / requiredTime) * 100}%`;
          
          if (traceTime >= requiredTime) {
            clearInterval(interval);
            resolve(true);
          }
        } else {
          clearInterval(interval);
        }
      }, 100);
    });
    
    target.addEventListener('mouseleave', () => {
      mouseIn = false;
      target.style.background = '#ff4757';
      if (traceTime < requiredTime) {
        setTimeout(() => resolve(false), 1000);
      }
    });
  });
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

// Simple test code (just press 'S' for immediate test)
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.code); // Debug log
  
  // Simple test trigger - press 'S' key
  if (e.code === 'KeyS') {
    showSquidGameAlert('🎮 TEST ACTIVATED!\n\nThis proves the system works!\n\nNow try the full Konami code:\n↑ ↑ ↓ ↓ ← → ← → B A');
    return;
  }
  
  // Full Konami code
  konamiSequence.push(e.code);
  console.log('Current sequence:', konamiSequence); // Debug log
  
  // Keep only the last 10 keys
  if (konamiSequence.length > konamiCode.length) {
    konamiSequence.shift();
  }
  
  // Check if sequence matches
  if (konamiSequence.length === konamiCode.length && konamiSequence.join(',') === konamiCode.join(',')) {
    showSquidGameAlert('🎮 EASTER EGG ACTIVATED!\n\n🔺🔴🟢 You found the secret Squid Game code!\n\nPlayer #456 status: UNLOCKED\nSpecial privileges granted!\n\n"The games never truly end... they just evolve."');
    konamiSequence = [];
    console.log('Konami code activated!'); // Debug log
  }
  
  // Show progress indicator for Konami sequence
  const progress = konamiSequence.length;
  const maxProgress = konamiCode.length;
  if (progress > 0 && progress < maxProgress) {
    const isCorrectSoFar = konamiSequence.every((key, index) => key === konamiCode[index]);
    if (isCorrectSoFar) {
      console.log(`Konami progress: ${progress}/${maxProgress} ✓`);
    } else {
      console.log('Wrong sequence, resetting...');
      konamiSequence = [];
    }
  }
});
