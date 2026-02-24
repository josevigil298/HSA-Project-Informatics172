// module1.js
const buttons = document.querySelectorAll('.question-section .btn-outline-primary');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
const feedback = document.getElementById('feedback');

let selectedButton = null;
let attempts = 0;

// Select an answer
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        selectedButton = button;
        feedback.textContent = "";
    });
});

// Check answer
checkBtn.addEventListener('click', () => {
    if (!selectedButton) {
        feedback.textContent = "Please select an answer first!";
        feedback.style.color = "red";
        return;
    }

    if (selectedButton.dataset.correct === "true") {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        // Disable buttons after correct answer
        buttons.forEach(b => b.disabled = true);

        // Show Next button
        nextBtn.style.display = "inline-block";
        skipBtn.style.display = "none";

    } else {
        attempts++;
        if (attempts < 2) {
            feedback.textContent = "Wrong. Try again.";
            feedback.style.color = "red";
        } else {
            // Find the correct answer dynamically
            const correctButton = Array.from(buttons).find(b => b.dataset.correct === "true");
            feedback.textContent = `Wrong again. The correct answer is ${correctButton.textContent}.`;
            feedback.style.color = "blue";

            // Disable buttons
            buttons.forEach(b => b.disabled = true);

            // Show Next and Skip
            nextBtn.style.display = "inline-block";
            skipBtn.style.display = "inline-block";
        }
    }
});