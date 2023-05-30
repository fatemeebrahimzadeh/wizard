// Initial step and step count
let stepNumber = 1;
let stepCount = 3;

// Get DOM elements
const steps = document.querySelectorAll(".step");
const prevBtn = document.querySelector(".prev-button");
const nextBtn = document.querySelector(".next-button");

// URL handling
let baseUrl = ""; // Initialize baseUrl as an empty string

// Get the base URL once and assign it to the baseUrl variable
const getBaseUrl = () => {
  const currentURL = window.location.href;
  const pathArray = currentURL.split("/");
  baseUrl = pathArray[0] + "//" + pathArray[2];
};

// Call the getBaseUrl function to set the baseUrl initially
getBaseUrl();

// Set URL with step number parameter
const setUrl = () => {
  window.location.href = `${baseUrl}?step=${stepNumber}`;
};

// Get step number from URL query parameter
const getFromUrl = () => {
  let currentURL = window.location.href;
  let params = new URLSearchParams(new URL(currentURL).search);
  let step = params.get("step");
  stepNumber = step ? Number(step) : Number(stepNumber);
};

// Local storage handling
const getFromLocalStorage = () => {
  try {
    // Retrieve step number from local storage
    const localStorageData = localStorage.getItem("stepInfo");
    if (localStorageData) {
      stepNumber = JSON.parse(localStorageData);
    }
  } catch (error) {
    console.error("Error retrieving step number from local storage:", error);
  }
};

const setStepToLocalStorage = () => {
  try {
    // Store current step number in local storage
    localStorage.setItem("stepInfo", JSON.stringify(stepNumber));
  } catch (error) {
    console.error("Error storing step number in local storage:", error);
  }
};

// Step button event handling
const isPrevBtnEnable = () => {
  // Check if previous button should be enabled
  return stepNumber !== 1;
};

const isNextBtnEnable = () => {
  // Check if next button should be enabled
  return stepNumber !== stepCount;
};

const isButtonsEnable = () => {
  // Enable/disable previous and next buttons based on step number
  prevBtn.disabled = !isPrevBtnEnable();
  nextBtn.disabled = !isNextBtnEnable();
};

const setCurrentStep = () => {
  // Update current step styles
  isButtonsEnable();
  for (let index = 1; index <= stepCount; index++) {
    if (index <= stepNumber) {
      // Add "step-success" class to completed steps
      !steps[index - 1].classList.contains("step-success") &&
        steps[index - 1].classList.add("step-success");
    } else {
      // Remove "step-success" class from incomplete steps
      steps[index - 1].classList.contains("step-success") &&
        steps[index - 1].classList.remove("step-success");
    }
  }
};

const buttonEventHandler = (type) => {
  try {
    // Handle button click events
    if (type === "prev") {
      if (!isPrevBtnEnable()) return;
      stepNumber -= 1;
      nextBtn.disabled = !isNextBtnEnable();
    } else {
      if (!isNextBtnEnable()) return;
      stepNumber += 1;
      prevBtn.disabled = !isPrevBtnEnable();
    }
    setCurrentStep();
    setStepToLocalStorage();
    // setUrl();
  } catch (error) {
    console.error("Error handling button event:", error);
  }
};

// Initialization
getFromLocalStorage();
// getFromUrl();
setCurrentStep();

// Event listeners
prevBtn.addEventListener("click", () => buttonEventHandler("prev"));
nextBtn.addEventListener("click", () => buttonEventHandler("next"));
