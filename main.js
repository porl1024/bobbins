const answers = [
  "404 Answer Not Found",
  "Ask again after coffee",
  "My sources say... maybe?",
  "Yes, unfortunately",
  "Don't bet on it (or do, I'm a ball)",
  "I'm on break",
  "Outlook fuzzy, try glasses",
  "Reply hazy, try again",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

const ball = document.getElementById('magic-ball');
const answerText = document.getElementById('answer-text');
const triangle = document.getElementById('triangle');
let isShaking = false;

function getAnswer() {
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex];
}

function shakeBall() {
  if (isShaking) return;
  
  isShaking = true;
  
  // Reset state
  ball.classList.remove('revealing');
  ball.classList.add('shaking');
  
  // Haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  // After shake animation
  setTimeout(() => {
    ball.classList.remove('shaking');
    
    // Set new answer
    answerText.textContent = getAnswer();
    
    // Reveal animation
    ball.classList.add('revealing');
    
    isShaking = false;
  }, 500); // 500ms matches CSS animation duration
}

ball.addEventListener('click', shakeBall);

// Add simple accelerometer support for mobile shake
let lastX, lastY, lastZ;
let lastUpdate = 0;
const SHAKE_THRESHOLD = 15;

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', (event) => {
    const current = event.accelerationIncludingGravity;
    if (!current) return;
    
    const curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 100) {
      const diffTime = curTime - lastUpdate;
      lastUpdate = curTime;

      const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;

      if (speed > SHAKE_THRESHOLD) {
        shakeBall();
      }

      lastX = current.x;
      lastY = current.y;
      lastZ = current.z;
    }
  });
}
