// ===== DOM REFERENCES =====
const passwordInput = document.getElementById('password-input');
const toggleBtn = document.getElementById('toggle-visibility');
const eyeOpen = document.getElementById('eye-open');
const eyeClosed = document.getElementById('eye-closed');
const strengthText = document.getElementById('strength-text');
const scoreDisplay = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.querySelector('.progress-bar');
const crackTimeText = document.getElementById('crack-time-text');
const generateBtn = document.getElementById('generate-btn');
const feedbackList = document.getElementById('feedback-list');

// Checklist items
const checkLength = document.getElementById('check-length');
const checkUppercase = document.getElementById('check-uppercase');
const checkLowercase = document.getElementById('check-lowercase');
const checkNumber = document.getElementById('check-number');
const checkSpecial = document.getElementById('check-special');

const meterSection = document.getElementById('meter-section');

// ===== TOGGLE PASSWORD VISIBILITY =====
toggleBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeOpen.classList.add('hidden');
    eyeClosed.classList.remove('hidden');
  } else {
    passwordInput.type = 'password';
    eyeOpen.classList.remove('hidden');
    eyeClosed.classList.add('hidden');
  }
});

// ===== PASSWORD GENERATOR =====
// Generates a strong random password meeting all criteria
function generateStrongPassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const all = uppercase + lowercase + numbers + special;

  // Ensure at least one of each type
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest (total length 16) with random chars
  for (let i = password.length; i < 16; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle using Fisher-Yates algorithm
  const arr = password.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join('');
}

generateBtn.addEventListener('click', () => {
  const strongPw = generateStrongPassword();
  passwordInput.value = strongPw;
  analyzePassword(strongPw);
});

// ===== ENTROPY CALCULATION (EXTRA CREDIT) =====
// Calculates password entropy in bits: log2(pool^length)
function calculateEntropy(password) {
  if (password.length === 0) return 0;

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  if (poolSize === 0) return 0;
  return Math.round(password.length * Math.log2(poolSize));
}

// ===== ESTIMATED CRACK TIME =====
// Educational estimate based on score (not cryptographically accurate)
function getCrackTime(score, password) {
  if (password.length === 0) return { text: '\u2014', color: 'var(--text-muted)' };

  if (score < 20) return { text: 'Could be cracked instantly', color: 'var(--danger)' };
  if (score < 40) return { text: 'A few seconds', color: 'var(--danger)' };
  if (score < 60) return { text: 'A few minutes to hours', color: 'var(--warning)' };
  if (score < 80) return { text: 'Several days to weeks', color: 'var(--warning)' };

  // For strong passwords, use entropy for a more realistic estimate
  const entropy = calculateEntropy(password);
  if (entropy >= 80) return { text: 'Several centuries', color: 'var(--success)' };
  if (entropy >= 60) return { text: 'Several years', color: 'var(--success)' };
  return { text: 'Several months', color: 'var(--success)' };
}

// ===== FEEDBACK MESSAGES =====
function generateFeedback(result, password) {
  const messages = [];

  if (password.length < 8) messages.push({ text: 'Password is too short — aim for at least 8 characters', type: 'warning' });
  if (!result.hasUppercase) messages.push({ text: 'Add uppercase letters for stronger security', type: 'warning' });
  if (!result.hasLowercase) messages.push({ text: 'Add lowercase letters to increase complexity', type: 'warning' });
  if (!result.hasNumber) messages.push({ text: 'Include numbers to make the password harder to guess', type: 'warning' });
  if (!result.hasSpecial) messages.push({ text: 'Add special characters like !@#$% for extra strength', type: 'warning' });

  if (messages.length === 0 && result.score >= 70) {
    messages.push({ text: 'Excellent! This is a strong password.', type: 'good' });
  } else if (messages.length === 0 && result.score >= 40) {
    messages.push({ text: 'Getting better — try adding more variety.', type: 'good' });
  }

  // Check for common weak patterns
  const common = ['password', '123456', 'qwerty', 'abc123', 'letmein', 'admin', 'welcome', 'monkey', 'dragon', 'master'];
  const lowerPw = password.toLowerCase();
  if (common.some(word => lowerPw.includes(word))) {
    messages.unshift({ text: 'Avoid common words or predictable patterns', type: 'warning' });
  }

  return messages;
}

// ===== RENDER FEEDBACK =====
function renderFeedback(messages) {
  feedbackList.innerHTML = '';
  messages.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = msg.text;
    li.className = msg.type === 'warning' ? 'feedback-warning' : 'feedback-good';
    feedbackList.appendChild(li);
  });
}

// ===== MAIN ANALYSIS FUNCTION =====
function analyzePassword(password) {
  const result = {
    // Check each requirement using regex
    length: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
    score: 0
  };

  // Scoring: +20 for each satisfied requirement
  result.score =
    (result.length ? 20 : 0) +
    (result.hasUppercase ? 20 : 0) +
    (result.hasLowercase ? 20 : 0) +
    (result.hasNumber ? 20 : 0) +
    (result.hasSpecial ? 20 : 0);

  // Determine strength level
  let level, levelClass;
  if (result.score === 0) {
    level = 'None';
    levelClass = 'strength-none';
  } else if (result.score < 40) {
    level = 'Weak';
    levelClass = 'strength-weak';
  } else if (result.score < 70) {
    level = 'Medium';
    levelClass = 'strength-medium';
  } else {
    level = 'Strong';
    levelClass = 'strength-strong';
  }

  // Update UI
  strengthText.textContent = level;
  scoreDisplay.textContent = `${result.score} / 100`;
  meterSection.className = `meter-section ${levelClass}`;

  // Update progress bar ARIA
  progressBar.setAttribute('aria-valuenow', result.score);

  // Animate progress bar width and color
  const progressWidth = result.score;
  let barColor;
  if (result.score < 40) barColor = 'var(--danger)';
  else if (result.score < 70) barColor = 'var(--warning)';
  else barColor = 'var(--success)';

  progressFill.style.width = `${progressWidth}%`;
  progressFill.style.background = barColor;
  progressFill.querySelector('.progress-glow').style.background = barColor;

  // Update checklist items
  updateCheckItem(checkLength, result.length);
  updateCheckItem(checkUppercase, result.hasUppercase);
  updateCheckItem(checkLowercase, result.hasLowercase);
  updateCheckItem(checkNumber, result.hasNumber);
  updateCheckItem(checkSpecial, result.hasSpecial);

  // Update crack time
  const crackInfo = getCrackTime(result.score, password);

  if (password.length > 0) {
    const entropy = calculateEntropy(password);
    crackTimeText.innerHTML = `<span style="color:${crackInfo.color};font-weight:600">${crackInfo.text}</span> &middot; <span style="color:var(--text-secondary)">${entropy} bits entropy</span>`;
  } else {
    crackTimeText.innerHTML = '<span style="color:var(--text-muted)">&mdash;</span>';
  }

  // Generate and render feedback
  const feedback = generateFeedback(result, password);
  renderFeedback(feedback);
}

// ===== HELPER: Update a single checklist item =====
function updateCheckItem(element, satisfied) {
  if (satisfied) {
    element.classList.remove('missing');
    element.classList.add('satisfied');
  } else {
    element.classList.remove('satisfied');
    element.classList.add('missing');
  }
}

// ===== EVENT LISTENER: Real-time analysis on input =====
passwordInput.addEventListener('input', (e) => {
  analyzePassword(e.target.value);
});

// ===== INITIAL STATE =====
// Run analysis once on load with empty password
analyzePassword('');
