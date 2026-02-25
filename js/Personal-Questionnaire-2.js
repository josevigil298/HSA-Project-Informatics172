// Select elements
const optionCards = document.querySelectorAll('.option-card');
const continueBtn = document.getElementById('continueBtn');

let selectedValue = null;

// Handle card selection
optionCards.forEach(card => {
    card.addEventListener('click', () => {

        // Remove selected class from all cards
        optionCards.forEach(c => c.classList.remove('selected'));

        // Add selected class to clicked card
        card.classList.add('selected');

        // Store selected value
        selectedValue = card.dataset.value;

        // Enable Continue button
        continueBtn.disabled = false;
    });
});

// Continue button navigation
continueBtn.addEventListener('click', () => {

    if (!selectedValue) return;

    if (selectedValue === "HDHP") {
        window.location.href = "../pages/Personal-Questionnaire-Q3.html";
    } 
    else if (selectedValue === "other") {
        window.location.href = "../pages/Dashboard.html";
    }
});