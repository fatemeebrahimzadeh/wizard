let stepNumber = 1;
let stepCount = 3;

const steps = document.querySelectorAll(".step");

const prevBtn = document.querySelector(".prev-button");
const nextBtn = document.querySelector(".next-button");

// url

let baseUrl = "http://localhost:5501/index.html";

const setUrl = () => {
  window.location.href = `${baseUrl}?step=${stepNumber}`;
};

const getFromUrl = () => {
  let currentURL = window.location.href;
  let params = new URLSearchParams(new URL(currentURL).search);
  let step = params.get("step");
  stepNumber = step ? Number(step) : Number(stepNumber);
};

// url

// local storage

const getfromLocalStorage = () => {
  const localstorageData = localStorage.getItem("stepInfo");
  if (localstorageData) {
    stepNumber = JSON.parse(localstorageData);
  }
};

const setStepToLocalStorage = () => {
  localStorage.setItem("stepInfo", JSON.stringify(stepNumber));
};

// local storage

const isPrevBtnEnable = () => {
  return stepNumber !== 1;
};

const isNextBtnEnable = () => {
  return stepNumber !== stepCount;
};

const isButtonsEnable = () => {
  prevBtn.disabled = !isPrevBtnEnable();
  nextBtn.disabled = !isNextBtnEnable();
};

const setCurrentStep = () => {
  isButtonsEnable();
  for (let index = 1; index <= stepCount; index++) {
    // default
    if (index <= stepNumber) {
      !steps[index - 1].classList.contains("step-success") &&
        steps[index - 1].classList.add("step-success");
    } else {
      steps[index - 1].classList.contains("step-success") &&
        steps[index - 1].classList.remove("step-success");
    }

    // danger
    // if(index < stepNumber){
    //     !steps[index - 1].classList.contains("step-success") && steps[index - 1].classList.add("step-success")
    // }
    // else if(index === stepNumber) {
    //     steps[index - 1].classList.contains("step-success") && steps[index - 1].classList.remove("step-success")
    //     !steps[index - 1].classList.contains("step-error") && steps[index - 1].classList.add("step-error")
    // }
    // else{
    //     steps[index - 1].classList.contains("step-success") && steps[index - 1].classList.remove("step-success")
    //     steps[index - 1].classList.contains("step-error") && steps[index - 1].classList.remove("step-error")
    // }
  }
};

const buttonEventHandler = (type) => {
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
};

getfromLocalStorage();
// getFromUrl();
setCurrentStep();
prevBtn.addEventListener("click", () => buttonEventHandler("prev"));
nextBtn.addEventListener("click", () => buttonEventHandler("next"));
