// Balance visibility toggle
const toggleBtn = document.getElementById("toggle-visibility");
const mainBalance = document.getElementById("main-balance");
const savingsBalance = document.getElementById("savings-balance");
const creditBalance = document.getElementById("credit-balance");
const eyeIcon = document.getElementById("eye-icon");

let isVisible = true;
const originalBalances = {
  main: "$24,586.50",
  savings: "$45,280.75",
  credit: "-$1,247.30",
};

toggleBtn.addEventListener("click", () => {
  isVisible = !isVisible;

  if (isVisible) {
    mainBalance.textContent = originalBalances.main;
    savingsBalance.textContent = originalBalances.savings;
    creditBalance.textContent = originalBalances.credit;
    eyeIcon.className = "fas fa-eye";
  } else {
    mainBalance.textContent = "••••••••";
    savingsBalance.textContent = "••••••••";
    creditBalance.textContent = "••••••••";
    eyeIcon.className = "fas fa-eye-slash";
  }
});

// Navigation functionality
const navButtons = document.querySelectorAll(".nav-btn");
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    navButtons.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");
  });
});

// Quick action buttons
const quickActionBtns = document.querySelectorAll(".quick-action-btn");
quickActionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.querySelector("span").textContent;
    showNotification(`${action} feature coming soon!`);
  });
});

// Transaction item clicks
const transactionItems = document.querySelectorAll(".transaction-item");
transactionItems.forEach((item) => {
  item.addEventListener("click", () => {
    const transactionName = item.querySelector("h4").textContent;
    showNotification(`Viewing details for ${transactionName}`);
  });
});

// Notification functionality
const notificationBtn = document.querySelector(".notification-btn");
notificationBtn.addEventListener("click", () => {
  showNotification(
    "You have 2 new notifications:\n• Transfer completed\n• Monthly statement ready"
  );
});

// Profile button
const profileBtn = document.querySelector(".profile-btn");
profileBtn.addEventListener("click", () => {
  showNotification("Profile settings coming soon!");
});

// Action buttons in main account card
const actionBtns = document.querySelectorAll(".action-btn");
actionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.textContent;
    showNotification(`${action} feature coming soon!`);
  });
});

// View all transactions button
const viewAllBtn = document.querySelector(".view-all-btn");
if (viewAllBtn) {
  viewAllBtn.addEventListener("click", () => {
    showNotification("Loading all transactions...");
  });
}

// Utility function to show notifications
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-info-circle"></i>
      <span>${message}</span>
    </div>
  `;

  // Add notification styles if not already present
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1a365d;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 90%;
        animation: slideDown 0.3s ease;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .notification-content i {
        color: #60a5fa;
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add notification to page
  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideDown 0.3s ease reverse";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Simulate real-time balance updates (optional demo feature)
function simulateBalanceUpdate() {
  if (isVisible) {
    const currentBalance = parseFloat(
      originalBalances.main.replace(/[$,]/g, "")
    );
    const variation = (Math.random() - 0.5) * 10; // Random variation between -5 and +5
    const newBalance = currentBalance + variation;
    originalBalances.main = `$${newBalance
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    mainBalance.textContent = originalBalances.main;
  }
}

// Uncomment the line below to enable real-time balance simulation
// setInterval(simulateBalanceUpdate, 30000); // Update every 30 seconds

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  console.log("SecureBank Digital Banking App Loaded");

  // Add subtle animations on load
  const cards = document.querySelectorAll(
    ".balance-card, .quick-action-btn, .transaction-item, .insight-card"
  );
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
});
