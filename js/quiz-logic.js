
document.querySelectorAll(".question-block").forEach((block) => {
    const options = Array.from(block.querySelectorAll(".option"));
    const checkBtn = block.querySelector(".btn-check-answer");
    const feedback = block.querySelector(".feedback");
  
    let selected = null;
    let attempts = 0;
    let locked = false;
  
    const clearExplanations = () => {
      block.querySelectorAll(".answer-explanation").forEach((el) => el.remove());
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
  
    // Select option
    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (locked) return;
  
        options.forEach((o) => o.classList.remove("active"));
        option.classList.add("active");
        selected = option;
  
        setFeedback("", null);
        clearExplanations();
      });
    });
  
    // Check answer
    checkBtn.addEventListener("click", () => {
      if (locked) return;
  
      if (!selected) {
        setFeedback("Please select an answer first.", "wrong");
        return;
      }
  
      const isCorrect = selected.dataset.correct === "true";
  
      if (isCorrect) {
        setFeedback("Correct!", "correct");
        showExplanationUnder(selected);
  
        locked = true;
        options.forEach((o) => (o.disabled = true));
        checkBtn.disabled = true;
        return;
      }
  
      // Wrong answer
      attempts += 1;
  
      if (attempts < 2) {
        setFeedback("Incorrect! Try Again.", "wrong");
        return;
      }
  
      // Second miss: lock + show correct explanation under correct option
      const correctOption = block.querySelector('[data-correct="true"]');
      setFeedback("Incorrect! Review the correct answer.", "wrong");
  
      if (correctOption) {
        showExplanationUnder(correctOption);
      }
  
      locked = true;
      options.forEach((o) => (o.disabled = true));
      checkBtn.disabled = true;
    });
  });