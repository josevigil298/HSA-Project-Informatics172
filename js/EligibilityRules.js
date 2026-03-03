const panels = document.querySelectorAll('.step-panel');

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        // Remove 'active' from all panels
        panels.forEach(p => p.classList.remove('active'));
        // Add 'active' to the clicked panel
        panel.classList.add('active');
    });
});