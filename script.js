// TODO: 1
// Initial step number and step count
let stepNumber = 1;
let stepCount = 3;

// TODO: 2
// Get DOM elements
const steps = document.querySelectorAll(".step");
const prevBtn = document.querySelector(".prev-button");
const nextBtn = document.querySelector(".next-button");

// TODO: 10
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

// TODO: 11
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

// TODO: 4
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

// TODO: 6
const setCurrentStep = () => {
  // Update current step styles
  isButtonsEnable();
  for (let index = 0; index < stepCount; index++) {
    // you can use "step-error" or "step-active" too
    if (index < stepNumber) {
      // Add "step-success" class to completed steps
      !steps[index].classList.contains("step-success") &&
        steps[index].classList.add("step-success");
    } else {
      // Remove "step-success" class from incomplete steps
      steps[index].classList.contains("step-success") &&
        steps[index].classList.remove("step-success");
    }

    // danger
    // if (index < stepNumber - 1) {
    //   !steps[index ].classList.contains("step-success") && steps[index].classList.add("step-success")
    // }
    // else if (index === stepNumber - 1) {
    //   steps[index].classList.contains("step-success") && steps[index].classList.remove("step-success")
    //   !steps[index].classList.contains("step-error") && steps[index].classList.add("step-error")
    // }
    // else {
    //   steps[index].classList.contains("step-success") && steps[index].classList.remove("step-success")
    //   steps[index].classList.contains("step-error") && steps[index].classList.remove("step-error")
    // }
  }
};

// TODO: 3
const buttonEventHandler = (type) => {
  try {
    // Handle button click events
    if (type === "prev") {
      // avoid doing anything even the user change disable setting throgh inspect
      // TODO: 5
      if (!isPrevBtnEnable()) return;
      stepNumber -= 1;
    } else {
      if (!isNextBtnEnable()) return;
      stepNumber += 1;
    }
    // TODO: 7
    setCurrentStep();
    setStepToLocalStorage();
    // setUrl();
  } catch (error) {
    console.error("Error handling button event:", error);
  }
};

// TODO: 8
// Event listeners
prevBtn.addEventListener("click", () => buttonEventHandler("prev"));
nextBtn.addEventListener("click", () => buttonEventHandler("next"));

// Initialization
getFromLocalStorage();
// getFromUrl();
// TODO: 9
setCurrentStep();

