const heroButton = document.getElementById("heroButton");
const navButton = document.getElementById("navButton");

window.addEventListener("scroll", function () {
    const buttonPosition = heroButton.getBoundingClientRect().bottom;

    if (buttonPosition < 0) {
        navButton.classList.remove("d-none");
    } else {
        navButton.classList.add("d-none");
    }
});
