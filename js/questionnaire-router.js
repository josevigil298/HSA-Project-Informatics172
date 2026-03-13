const STORAGE_KEY = "hsaQuestionnaireAnswers";
const FINAL_ROUTE_KEY = "hsaFinalRoute";

const QUESTION_KEYS = {
  1: "taxStatus",
  2: "insuranceStatus",
  3: "insuranceSource",
  4: "planType"
};

function getCurrentQuestionNumber() {
  return Number(document.body.dataset.question) || 1;
}

function getAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveAnswers(answers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

function saveAnswer(questionNumber, value) {
  const answers = getAnswers();
  const key = QUESTION_KEYS[questionNumber];
  answers[key] = value;
  saveAnswers(answers);
}

function getSavedAnswer(questionNumber) {
  const answers = getAnswers();
  return answers[QUESTION_KEYS[questionNumber]] || null;
}

function saveFinalRoute(route) {
  localStorage.setItem(FINAL_ROUTE_KEY, route);
}

function shouldSkipQuestion4(answers) {
  return (
    answers.taxStatus === "dependent" &&
    answers.insuranceStatus === "insured" &&
    (
      answers.insuranceSource === "guardian" ||
      answers.insuranceSource === "university" ||
      answers.insuranceSource === "employer"
    )
  );
}

function getFinalRoute(answers) {
  const { taxStatus, insuranceStatus, insuranceSource, planType } = answers;

  console.log("Routing with answers:", answers);

  // ------------------------------------------------
  // Independent + Not Insured -> Dashboard
  // ------------------------------------------------
  if (
    taxStatus === "independent" &&
    insuranceStatus === "uninsured"
  ) {
    return "../Dashboards/Dashboard.html";
  }

  // ------------------------------------------------
  // Dependent + Uninsured -> Dashboard
  // ------------------------------------------------
  if (
    taxStatus === "dependent" &&
    insuranceStatus === "uninsured"
  ) {
    return "../Dashboards/Dashboard-4.html";
  }

  // ------------------------------------------------
  // Dependent + Insured Under Guardian -> Dashboard
  // plan type does not matter
  // ------------------------------------------------
  if (
    taxStatus === "dependent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "guardian"
  ) {
    return "../Dashboards/Dashboard-2.html";
  }

  // ------------------------------------------------
  // Dependent + Insured Under University -> Dashboard
  // plan type does not matter
  // ------------------------------------------------
  if (
    taxStatus === "dependent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "university"
  ) {
    return "../Dashboards/Dashboard-4.html";
  }

  // ------------------------------------------------
  // Dependent + Insured Under Employer -> Dashboard
  // plan type does not matter
  // ------------------------------------------------
  if (
    taxStatus === "dependent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "employer"
  ) {
    return "../Dashboards/Dashboard-3.html";
  }

  // ------------------------------------------------
  // Independent + Insured Under Guardian + HDHP
  // -> HSA Resources
  // ------------------------------------------------
  if (
    taxStatus === "independent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "guardian" &&
    planType === "hdhp"
  ) {
    return "../Result-Question/HSA-Resources.html";
  }

  // ------------------------------------------------
  // Independent + Insured Under Employer + HDHP
  // -> HSA Resources
  // ------------------------------------------------
  if (
    taxStatus === "independent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "employer" &&
    planType === "hdhp"
  ) {
    return "../Result-Question/HSA-Resources.html";
  }

  // ------------------------------------------------
  // Independent + Insured Under Guardian + Other
  // -> Next Step
  // ------------------------------------------------
  if (
    taxStatus === "independent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "guardian" &&
    planType === "other"
  ) {
    return "../Result-Question/Next-Step.html";
  }

  // ------------------------------------------------
  // Independent + Insured Under Employer + Other
  // -> Next Step
  // ------------------------------------------------
  if (
    taxStatus === "independent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "employer" &&
    planType === "other"
  ) {
    return "../Result-Question/Next-Step-2.html";
  }

  // ------------------------------------------------
  // Independent + Insured Under University + Other
  // -> Next Step
  // ------------------------------------------------
  if (
    taxStatus === "independent" &&
    insuranceStatus === "insured" &&
    insuranceSource === "university" &&
    planType === "other"
  ) {
    return "../Result-Question/Next-Step-3.html";
  }

  console.error("No matching route for this answer combination:", answers);
  alert("No route matches this answer combination yet. Check the console.");
  return null;
}

function goToLoadingScreen(finalRoute) {
  saveFinalRoute(finalRoute);
  window.location.href = "../personal-questions/loading.html";
}

function goToNextQuestion(questionNumber) {
  const answers = getAnswers();

  // Q1 -> Q2
  if (questionNumber === 1) {
    window.location.href = "../personal-questions/Personal-Questionnaire-Q2.html";
    return;
  }

  // Q2 -> if uninsured, go straight to final route through loading screen; if insured, go to Q3
  if (questionNumber === 2) {
    if (answers.insuranceStatus === "uninsured") {
      const route = getFinalRoute(answers);
      if (route) goToLoadingScreen(route);
      return;
    }

    if (answers.insuranceStatus === "insured") {
      window.location.href = "../personal-questions/Personal-Questionnaire-Q3.html";
      return;
    }
  }

  // Q3 -> skip Q4 when plan type does not matter
  if (questionNumber === 3) {
    if (shouldSkipQuestion4(answers)) {
      const route = getFinalRoute(answers);
      if (route) goToLoadingScreen(route);
      return;
    }

    window.location.href = "../personal-questions/Personal-Questionnaire-Q4.html";
    return;
  }

  // Q4 -> final route through loading screen
  if (questionNumber === 4) {
    const route = getFinalRoute(answers);
    if (route) goToLoadingScreen(route);
    return;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const questionNumber = getCurrentQuestionNumber();
  const optionCards = document.querySelectorAll(".option-card");
  const continueBtn = document.getElementById("continueBtn");

  if (!optionCards.length || !continueBtn) return;

  let selectedValue = getSavedAnswer(questionNumber);

  function updateUI() {
    optionCards.forEach((card) => {
      card.classList.toggle("selected", card.dataset.value === selectedValue);
    });

    continueBtn.disabled = !selectedValue;
  }

  updateUI();

  optionCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedValue = card.dataset.value;
      saveAnswer(questionNumber, selectedValue);
      updateUI();
    });
  });

  continueBtn.addEventListener("click", () => {
    if (!selectedValue) return;

    console.log("Current question:", questionNumber);
    console.log("Saved answers:", getAnswers());

    goToNextQuestion(questionNumber);
  });
});