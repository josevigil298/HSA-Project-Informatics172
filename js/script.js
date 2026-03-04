document.addEventListener("scroll", function () {
    const navButton = document.getElementById("navButton");

    if (window.scrollY > 150) {
        navButton.classList.add("nav-visible");
    } else {
        navButton.classList.remove("nav-visible");
    }
});