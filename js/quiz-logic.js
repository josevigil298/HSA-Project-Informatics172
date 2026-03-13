document.querySelectorAll(".question-block").forEach((block) => {
  const options = Array.from(block.querySelectorAll(".option"));
  const checkBtn = block.querySelector(".btn-check-answer");
  const feedback = block.querySelector(".feedback");

  let selected = null;
  let attempts = 0;
  let locked = false;
  let completed = false;

  checkBtn.disabled = true;

  const updateContinueButton = () => {
    const allBlocks = document.querySelectorAll(".question-block");
    const allCompleted = Array.from(allBlocks).every(
      (b) => b.dataset.completed === "true"
    );

    const nextBtn = document.querySelector(".btn-next");
    if (nextBtn) {
      nextBtn.classList.toggle("disabled", !allCompleted);
      nextBtn.setAttribute("aria-disabled", String(!allCompleted));

      if (allCompleted) {
        nextBtn.removeAttribute("tabindex");
      } else {
        nextBtn.setAttribute("tabindex", "-1");
      }
    }
  };

  const clearExplanations = () => {
    block.querySelectorAll(".answer-explanation").forEach((el) => el.remove());
  };

  const clearCorrectHighlight = () => {
    options.forEach((o) => o.classList.remove("correct-answer"));
  };

  const setFeedback = (msg, type) => {
    feedback.textContent = msg;
    feedback.classList.remove("correct", "wrong");
    if (type) feedback.classList.add(type);
  };

  const showExplanationUnder = (optionEl) => {
    const explainText = optionEl.dataset.explain;
    if (!explainText) return;

    clearExplanations();

    const div = document.createElement("div");
    div.className = "answer-explanation";
    div.textContent = explainText;

    optionEl.insertAdjacentElement("afterend", div);
  };

  const markQuestionComplete = () => {
    if (!completed) {
      completed = true;
      block.dataset.completed = "true";
      updateContinueButton();
    }
  };

  options.forEach((option) => {
    option.addEventListener("click", () => {
      if (locked) return;

      options.forEach((o) => o.classList.remove("active"));
      clearCorrectHighlight();

      option.classList.add("active");
      selected = option;

      setFeedback("", null);
      clearExplanations();

      checkBtn.disabled = false;
    });
  });

  checkBtn.addEventListener("click", () => {
    if (locked || !selected) return;

    const isCorrect = selected.dataset.correct === "true";

    if (isCorrect) {
      setFeedback("Correct!", "correct");
      clearCorrectHighlight();
      selected.classList.add("correct-answer");
      showExplanationUnder(selected);

      locked = true;
      markQuestionComplete();

      options.forEach((o) => (o.disabled = true));
      checkBtn.disabled = true;
      return;
    }

    attempts += 1;

    if (attempts < 2) {
      setFeedback("Incorrect! Try Again.", "wrong");
      return;
    }

    const correctOption = block.querySelector('[data-correct="true"]');
    setFeedback("Incorrect! Review the correct answer.", "wrong");

    if (correctOption) {
      clearCorrectHighlight();
      correctOption.classList.add("correct-answer");
      showExplanationUnder(correctOption);
    }

    locked = true;
    markQuestionComplete();

    options.forEach((o) => (o.disabled = true));
    checkBtn.disabled = true;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".btn-next");
  if (nextBtn) {
    nextBtn.classList.add("disabled");
    nextBtn.setAttribute("aria-disabled", "true");
    nextBtn.setAttribute("tabindex", "-1");
  }
});