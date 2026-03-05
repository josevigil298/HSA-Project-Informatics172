document.querySelectorAll(".plan-toggle").forEach((cb) => {
    const card = cb.closest(".plan-card");
    // set initial state
    if (cb.checked) card.classList.add("is-done");
    else card.classList.remove("is-done");

    cb.addEventListener("change", () => {
      card.classList.toggle("is-done", cb.checked);
    });
  });