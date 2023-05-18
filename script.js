// Timer/Stopwatch variables
let minutes = 0;
let seconds = 0;
let deciseconds = 0;
let timer;
let isPaused = true;
let isTimer = true;

// DOM elements
const timerDisplay = document.querySelector('.timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerSwitch = document.getElementById('timerSwitch');
const timerSettings = document.getElementById('timerSettings');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

// Event listeners
startBtn.addEventListener('click', startPauseTimer);
pauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
timerSwitch.addEventListener('change', toggleTimerStopwatch);
minutesInput.addEventListener('input', updateTimerSettings);
secondsInput.addEventListener('input', updateTimerSettings);

// Timer/Stopwatch functions
function startPauseTimer() {
  if (isPaused) {
    startTimer();
  } else {
    pauseTimer();
  }
}

function startTimer() {
  timer = setInterval(updateTimer, 100);
  isPaused = false;
  startBtn.textContent = 'Pause';
  pauseBtn.disabled = false;
  disableTimerSettings();
}

function pauseTimer() {
  clearInterval(timer);
  isPaused = true;
  startBtn.textContent = 'Resume';
  enableTimerSettings();
}

function resetTimer() {
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  deciseconds = 0;
  updateTimerDisplay();
  isPaused = true;
  startBtn.textContent = 'Start';
  pauseBtn.disabled = true;
  enableTimerSettings();
}

function updateTimer() {
  deciseconds++;
  if (deciseconds === 10) {
    deciseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');
  const displayDeciseconds = String(deciseconds);
  timerDisplay.textContent = `${displayMinutes}:${displaySeconds}:${displayDeciseconds}`;
}

function updateTimerSettings() {
  minutes = parseInt(minutesInput.value) || 0;
  seconds = parseInt(secondsInput.value) || 0;
}

function toggleTimerStopwatch() {
  isTimer = !isTimer;
  if (isTimer) {
    timerSettings.style.display = 'block';
  } else {
    timerSettings.style.display = 'none';
  }
  resetTimer();
}

function disableTimerSettings() {
  minutesInput.disabled = true;
  secondsInput.disabled = true;
}

function enableTimerSettings() {
  minutesInput.disabled = false;
  secondsInput.disabled = false;
}

// Initial setup
toggleTimerStopwatch();
