/* ============================================
   SINGLE: THE BLOCKBUSTER 💔🎬
   Interactive Bollywood Cinematic Script
   Vanilla JS — No frameworks needed
   ============================================ */

// ——————————————————————————————————————
// 🎬  DRAMATIC BOLLYWOOD DIALOGUES
// ——————————————————————————————————————
const dialogues = [
  '"Background music starts... 🎻😭"',
  '"This Valentine\'s Day, love is missing... like my messages."',
  '"Even the flowers are judging you today 🌹💀"',
  '"Director: Add more pain. Audience: Why??"',
  '"The villain is not your ex… it\'s loneliness 😭"',
  '"Coming soon: Season 2 of being single."',
  '"Intermission? No. Only suffering."',
  '"You are single… but you are still ICONIC 😎🔥"',
  '"Plot twist: You don\'t need them anyway."',
  '"Rishta auntie has left the chat 📵"',
  '"*dramatic zoom on face* ...pyaar dhokebaaz hai."',
  '"Narrator: And no one swiped right. The end."',
  '"Love is in the air? Nahi bhai, pollution hai."',
  '"Dil toh toota… par WiFi toh connected hai."',
  '"This scene has been sponsored by: Loneliness™"',
  '"Heart: I\'m ready. Universe: LOL no."',
  '"Breaking news: Still single. More at 11."',
  '"Even Cupid ghosted me this year 🏹👻"',
  '"My love life is a 404 — Page Not Found."',
  '"Alexa, play \'Tujhse Naraz Nahi Zindagi\' 🎵😢"',
  '"Couples are celebrating. I\'m debugging my life."',
  '"Roses are red, violets are blue, nobody texted, not even you."',
  '"Single life: loading... loading... still loading..."',
];

// ——————————————————————————————————————
// 🎬  TRAILER LINES
// ——————————————————————————————————————
const trailerLines = [
  'THIS FEBRUARY...',
  'ONE HEART...',
  'ZERO TEXTS...',
  'A STORY OF PAIN...',
  'AND BAD WIFI...',
  'SINGLE: THE BLOCKBUSTER 💔🎬',
];

// ——————————————————————————————————————
// DOM REFERENCES
// ——————————————————————————————————————
const mainScreen     = document.getElementById('main-screen');
const endingScreen   = document.getElementById('ending-screen');
const btnYes         = document.getElementById('btn-yes');
const btnNo          = document.getElementById('btn-no');
const btnTrailer     = document.getElementById('btn-trailer');
const btnReplay      = document.getElementById('btn-replay');
const dialogueText   = document.getElementById('dialogue-text');
const trailerOverlay = document.getElementById('trailer-overlay');
const trailerTextEl  = document.getElementById('trailer-text');
const heartsContainer   = document.getElementById('floating-hearts');
const sparklesContainer = document.getElementById('sparkles');
const endingHearts      = document.getElementById('ending-hearts');

// ——————————————————————————————————————
// 💔  FLOATING HEARTS GENERATOR
// ——————————————————————————————————————
const heartEmojis = ['💔', '😭', '🥀', '😢', '💀', '🖤', '🤡'];

/**
 * Spawn floating heart particles into a container
 * @param {HTMLElement} container  Target container
 * @param {number}      count     Number of particles
 */
function spawnHearts(container, count = 14) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.classList.add('heart-particle');
    el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${6 + Math.random() * 8}s`;
    el.style.animationDelay = `${Math.random() * 10}s`;
    el.style.fontSize = `${1 + Math.random() * 1.2}rem`;
    container.appendChild(el);
  }
}

// Spawn hearts on main page
spawnHearts(heartsContainer, 16);

// ——————————————————————————————————————
// ✨  SPARKLES GENERATOR
// ——————————————————————————————————————
function spawnSparkles(count = 25) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.classList.add('sparkle');
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 5}s`;
    s.style.animationDuration = `${1.5 + Math.random() * 2}s`;
    sparklesContainer.appendChild(s);
  }
}
spawnSparkles();

// ——————————————————————————————————————
// 🎬  DIALOGUE SYSTEM  (typing animation)
// ——————————————————————————————————————
let isTyping = false;  // Prevent overlapping animations
let lastDialogueIdx = -1;

/**
 * Show a random dialogue with typewriter effect
 */
function showRandomDialogue() {
  if (isTyping) return;

  // Pick a random dialogue, avoid repeating same one
  let idx;
  do { idx = Math.floor(Math.random() * dialogues.length); } while (idx === lastDialogueIdx && dialogues.length > 1);
  lastDialogueIdx = idx;

  const text = dialogues[idx];
  typeDialogue(text);
}

/**
 * Typewriter animation for dialogue text
 * @param {string} text  Text to type
 */
function typeDialogue(text) {
  isTyping = true;
  dialogueText.innerHTML = '<span class="cursor-blink"></span>';
  let i = 0;
  const speed = 30; // ms per character

  const interval = setInterval(() => {
    if (i < text.length) {
      dialogueText.innerHTML = text.slice(0, i + 1) + '<span class="cursor-blink"></span>';
      i++;
    } else {
      clearInterval(interval);
      // Remove cursor after a short delay
      setTimeout(() => {
        dialogueText.innerHTML = text;
        isTyping = false;
      }, 1200);
    }
  }, speed);
}

// Show dialogue on various interactions
document.addEventListener('mousemove', throttle(() => showRandomDialogue(), 4000));
document.addEventListener('click', () => showRandomDialogue());
document.addEventListener('touchstart', () => showRandomDialogue(), { passive: true });

// ——————————————————————————————————————
// 🚫  NO BUTTON — IMPOSSIBLE TO CLICK
// ——————————————————————————————————————
let noEscaped = false; // Has it started escaping?
const ESCAPE_RADIUS = 120; // px — proximity trigger
const EDGE_PADDING  = 30;  // px — stay away from edges

/**
 * Calculate distance between center of NO button and cursor
 */
function getDistanceToNo(clientX, clientY) {
  const rect = btnNo.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.hypot(clientX - cx, clientY - cy);
}

/**
 * Teleport the NO button to a random safe position on screen
 */
function escapeNoButton() {
  const rect = btnNo.getBoundingClientRect();
  const bw = rect.width;
  const bh = rect.height;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Shake first
  btnNo.classList.add('shake');
  setTimeout(() => btnNo.classList.remove('shake'), 200);

  // Switch to fixed positioning if not already
  if (!noEscaped) {
    noEscaped = true;
    btnNo.classList.add('escaping');
  }

  // Random position clamped inside viewport
  const maxX = vw - bw - EDGE_PADDING;
  const maxY = vh - bh - EDGE_PADDING;
  const newX = EDGE_PADDING + Math.random() * (maxX - EDGE_PADDING);
  const newY = EDGE_PADDING + Math.random() * (maxY - EDGE_PADDING);

  btnNo.style.left = `${newX}px`;
  btnNo.style.top  = `${newY}px`;

  // Show whoosh indicator
  showWhoosh(rect.left + bw / 2, rect.top + bh / 2);
}

/**
 * Show a quick "WHOOSH!" text at the button's old position
 */
function showWhoosh(x, y) {
  const el = document.createElement('span');
  el.classList.add('whoosh-text');
  el.textContent = 'WHOOSH!';
  el.style.left = `${x}px`;
  el.style.top  = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

// Mouse proximity check
document.addEventListener('mousemove', (e) => {
  if (mainScreen.classList.contains('fade-out')) return;
  if (getDistanceToNo(e.clientX, e.clientY) < ESCAPE_RADIUS) {
    escapeNoButton();
  }
});

// Touch support for mobile
document.addEventListener('touchmove', (e) => {
  if (mainScreen.classList.contains('fade-out')) return;
  const t = e.touches[0];
  if (getDistanceToNo(t.clientX, t.clientY) < ESCAPE_RADIUS) {
    escapeNoButton();
  }
}, { passive: true });

document.addEventListener('touchstart', (e) => {
  if (mainScreen.classList.contains('fade-out')) return;
  const t = e.touches[0];
  if (getDistanceToNo(t.clientX, t.clientY) < ESCAPE_RADIUS + 40) {
    escapeNoButton();
  }
}, { passive: true });

// Also escape on direct click (just in case)
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  escapeNoButton();
  showRandomDialogue();
});

// ——————————————————————————————————————
// 💘  YES BUTTON — DRAMATIC ENDING
// ——————————————————————————————————————
btnYes.addEventListener('click', () => {
  // Fade out main screen
  mainScreen.classList.add('fade-out');

  setTimeout(() => {
    mainScreen.style.display = 'none';
    // Show ending screen
    endingScreen.classList.remove('hidden');
    endingScreen.style.opacity = '0';
    requestAnimationFrame(() => {
      endingScreen.style.opacity = '1';
    });

    // Spawn ending hearts & tissues
    spawnHearts(endingHearts, 20);
    spawnTissues(endingHearts, 12);
  }, 1000);
});

/**
 * Spawn floating tissue emojis for the ending scene
 */
function spawnTissues(container, count) {
  const tissueEmojis = ['🧻', '😭', '💔', '🥲', '😿', '🤧'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.classList.add('tissue');
    el.textContent = tissueEmojis[Math.floor(Math.random() * tissueEmojis.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${5 + Math.random() * 6}s`;
    el.style.animationDelay = `${Math.random() * 8}s`;
    el.style.fontSize = `${1.2 + Math.random() * 1}rem`;
    container.appendChild(el);
  }
}

// ——————————————————————————————————————
// 🔁  REPLAY BUTTON
// ——————————————————————————————————————
btnReplay.addEventListener('click', () => {
  // Fade out ending screen
  endingScreen.style.opacity = '0';

  setTimeout(() => {
    endingScreen.classList.add('hidden');
    endingScreen.style.opacity = '';

    // Clear ending hearts
    endingHearts.innerHTML = '';

    // Reset NO button position
    noEscaped = false;
    btnNo.classList.remove('escaping');
    btnNo.style.left = '';
    btnNo.style.top  = '';

    // Show main screen again
    mainScreen.style.display = '';
    mainScreen.classList.remove('fade-out');
  }, 800);
});

// ——————————————————————————————————————
// 🎭  TRAILER MODE
// ——————————————————————————————————————
let trailerRunning = false;

btnTrailer.addEventListener('click', async () => {
  if (trailerRunning) return;
  trailerRunning = true;

  // Show overlay
  trailerOverlay.classList.remove('hidden');
  trailerOverlay.style.opacity = '1';

  for (const line of trailerLines) {
    trailerTextEl.textContent = line;
    trailerTextEl.className = 'trailer-text'; // reset

    // Fade in + scale up
    await wait(100);
    trailerTextEl.classList.add('visible');

    await wait(1600);

    // Zoom out
    trailerTextEl.classList.remove('visible');
    trailerTextEl.classList.add('zoom-out');

    await wait(600);
  }

  // Fade out overlay
  trailerOverlay.style.opacity = '0';
  await wait(800);
  trailerOverlay.classList.add('hidden');
  trailerOverlay.style.opacity = '';
  trailerTextEl.className = 'trailer-text';

  trailerRunning = false;
});

// ——————————————————————————————————————
// 🎶  SOUND EFFECTS (Web Audio API)
// ——————————————————————————————————————

// Lazy-init AudioContext after first user gesture
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Quick whoosh sound using oscillator sweep
 */
function playWhoosh() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (_) { /* Audio not supported — fail silently */ }
}

/**
 * Dramatic violin-ish sting for YES button
 */
function playDramaticSting() {
  try {
    const ctx = getAudioCtx();
    const notes = [440, 523.25, 659.25, 783.99]; // A4, C5, E5, G5

    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = freq;

      const start = ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.08, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);

      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.9);
    });
  } catch (_) { /* fail silently */ }
}

// Attach sounds to events
const origEscape = escapeNoButton;
const wrappedEscapeNoButton = function () {
  origEscape();
  playWhoosh();
};
// Monkey-patch NO escape with sound
document.addEventListener('mousemove', (() => {
  // We already have a mousemove listener for proximity;
  // sound is triggered via showWhoosh which is inside escapeNoButton.
  // Let's hook into escapeNoButton directly by wrapping.
})());

// Override escapeNoButton to include sound
(function patchEscape() {
  const _origEscape = window.escapeNoButton || escapeNoButton;
  const _escape = escapeNoButton;
  // We'll patch via the proximity listener — add whoosh sound when showWhoosh fires
  const _origShowWhoosh = showWhoosh;

  // Replace showWhoosh globally to also play sound
  window._showWhooshPatched = function(x, y) {
    _origShowWhoosh(x, y);
    playWhoosh();
  };
})();

// Simpler approach: override showWhoosh
const _origShowWhoosh = showWhoosh;
// We can't reassign const, so instead insert sound into the escape function
// The cleanest approach: add sound in the mousemove/touchmove handler
// Let's use a MutationObserver on the whoosh element or just call playWhoosh in the escape path.
// Actually let's just add the sound call directly:
(function() {
  // We'll intercept the whoosh by listening for DOM insertions of .whoosh-text
  const observer = new MutationObserver((mutations) => {
    for (const mut of mutations) {
      for (const node of mut.addedNodes) {
        if (node.classList && node.classList.contains('whoosh-text')) {
          playWhoosh();
        }
      }
    }
  });
  observer.observe(document.body, { childList: true });
})();

// YES button dramatic sting
btnYes.addEventListener('click', () => {
  playDramaticSting();
});

// ——————————————————————————————————————
// 🛠  UTILITY FUNCTIONS
// ——————————————————————————————————————

/**
 * Promise-based delay
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Simple throttle — one call per `delay` ms
 */
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// ——————————————————————————————————————
// 🖥  WINDOW RESIZE SAFETY
// ——————————————————————————————————————
// If NO button is in escape mode, re-clamp on resize
window.addEventListener('resize', () => {
  if (!noEscaped) return;
  const rect = btnNo.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let x = rect.left;
  let y = rect.top;

  // Clamp
  x = Math.max(EDGE_PADDING, Math.min(x, vw - rect.width - EDGE_PADDING));
  y = Math.max(EDGE_PADDING, Math.min(y, vh - rect.height - EDGE_PADDING));

  btnNo.style.left = `${x}px`;
  btnNo.style.top  = `${y}px`;
});

// ——————————————————————————————————————
// 🎬  INITIAL DIALOGUE ON LOAD
// ——————————————————————————————————————
window.addEventListener('load', () => {
  setTimeout(() => {
    typeDialogue('"The curtains rise... the audience waits... 🎬"');
  }, 1500);
});
