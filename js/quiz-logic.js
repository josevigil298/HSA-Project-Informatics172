document.querySelectorAll('.question-block').forEach(block => {

    const options = block.querySelectorAll('.option');
    const checkBtn = block.querySelector('.btn-check-answer');
    const feedback = block.querySelector('.feedback');

    let selected = null;
    let attempts = 0;

    // Select option
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            selected = option;
            feedback.textContent = "";
        });
    });

    // Check answer
    checkBtn.addEventListener('click', () => {

        if (!selected) {
            feedback.textContent = "Please select an answer first.";
            feedback.style.color = "red";
            return;
        }

        if (selected.dataset.correct === "true") {
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
            options.forEach(o => o.disabled = true);
        } else {
            attempts++;

            if (attempts < 2) {
                feedback.textContent = "Wrong. Try again.";
                feedback.style.color = "red";
            } else {
                const correct = block.querySelector('[data-correct="true"]');
                feedback.textContent = "Incorrect. The correct answer is: " + correct.textContent;
                feedback.style.color = "blue";
                options.forEach(o => o.disabled = true);
            }
        }

    });

});