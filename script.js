let timer;
let currentExercise = 0;
let timeLeft;
let isResting = false;
let totalExercises;
let exerciseDuration;
let restDuration;

function showSettings() {
    // Clear any existing timer
    if (timer) {
        clearInterval(timer);
    }
    
    // Show settings page, hide timer page
    document.getElementById('settings-page').classList.add('active');
    document.getElementById('timer-page').classList.remove('active');
}

function showTimer() {
    // Show timer page, hide settings page
    document.getElementById('settings-page').classList.remove('active');
    document.getElementById('timer-page').classList.add('active');
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const progress = (currentExercise / totalExercises) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function updateStatus() {
    const status = document.getElementById('status');
    if (currentExercise >= totalExercises) {
        status.textContent = 'Workout Complete!';
        return;
    }
    status.textContent = isResting ? 
        `Rest between exercises ${currentExercise} and ${currentExercise + 1}` :
        `Exercise ${currentExercise + 1} of ${totalExercises}`;
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = formatTime(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (isResting) {
                currentExercise++;
                if (currentExercise >= totalExercises) {
                    updateStatus();
                    return;
                }
                isResting = false;
                timeLeft = exerciseDuration;
            } else {
                isResting = true;
                timeLeft = restDuration;
            }
            updateStatus();
            updateProgress();
            startTimer();
        }
    }, 1000);
}

function startWorkout() {
    // Get values from inputs
    totalExercises = parseInt(document.getElementById('exerciseCount').value);
    exerciseDuration = parseInt(document.getElementById('exerciseDuration').value);
    restDuration = parseInt(document.getElementById('restDuration').value);

    // Validate inputs
    if (isNaN(totalExercises) || isNaN(exerciseDuration) || isNaN(restDuration) ||
        totalExercises < 1 || exerciseDuration < 1 || restDuration < 1) {
        alert('Please enter valid numbers for all fields');
        return;
    }

    // Reset state
    currentExercise = 0;
    isResting = false;
    timeLeft = exerciseDuration;

    // Update UI
    updateStatus();
    updateProgress();
    document.getElementById('progress-bar').style.width = '0%';

    // Switch to timer page
    showTimer();

    // Start the timer
    startTimer();
} 