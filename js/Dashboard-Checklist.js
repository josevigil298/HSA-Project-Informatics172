const checkboxes = document.querySelectorAll('.sidebar input');
const progressCount = document.getElementById('progressCount');

function updateProgress() {
    const total = checkboxes.length;
    const completed = document.querySelectorAll('.sidebar input:checked').length;
    progressCount.textContent = `${completed} / ${total}`;
}

checkboxes.forEach(box => {
    box.addEventListener('change', updateProgress);
});

updateProgress();