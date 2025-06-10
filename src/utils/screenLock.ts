
let isQuizMode = false;
let warningCount = 0;
const MAX_WARNINGS = 3;

export const lockScreen = () => {
  isQuizMode = true;
  warningCount = 0;

  // Create overlay if doesn't exist
  if (!document.getElementById('quiz-lock-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'quiz-lock-overlay';
    overlay.className = 'quiz-locked';
    overlay.style.display = 'none';
    
    const warningText = document.createElement('h2');
    warningText.textContent = 'Warning! Please return to the quiz!';
    warningText.className = 'text-xl font-bold mb-2';
    
    const warningCount = document.createElement('p');
    warningCount.id = 'warning-count';
    warningCount.className = 'text-lg';
    
    overlay.appendChild(warningText);
    overlay.appendChild(warningCount);
    document.body.appendChild(overlay);
  }

  // Add event listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handleWindowBlur);
};

export const unlockScreen = () => {
  isQuizMode = false;
  const overlay = document.getElementById('quiz-lock-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }

  // Remove event listeners
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('blur', handleWindowBlur);
};

const handleVisibilityChange = () => {
  if (!isQuizMode) return;
  
  if (document.visibilityState === 'hidden') {
    incrementWarning();
  }
};

const handleWindowBlur = () => {
  if (!isQuizMode) return;
  incrementWarning();
};

const incrementWarning = () => {
  if (!isQuizMode) return;
  
  warningCount++;
  
  const overlay = document.getElementById('quiz-lock-overlay');
  const warningCountElement = document.getElementById('warning-count');
  
  if (overlay && warningCountElement) {
    overlay.style.display = 'flex';
    warningCountElement.textContent = `Warning ${warningCount} of ${MAX_WARNINGS}`;
    
    if (warningCount >= MAX_WARNINGS) {
      // In a real app, this could submit the quiz automatically or take other action
      warningCountElement.textContent = 'You have exceeded the maximum warnings. Your quiz has been submitted.';
    }
  }
  
  // Hide after 3 seconds if the user returns to the quiz
  setTimeout(() => {
    if (document.visibilityState !== 'hidden' && document.hasFocus()) {
      const overlay = document.getElementById('quiz-lock-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  }, 3000);
};

// Function to check if the user has exceeded warnings
export const hasExceededWarnings = () => {
  return warningCount >= MAX_WARNINGS;
};
