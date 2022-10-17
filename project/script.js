//form

const nameField = document.getElementById("name");
const cardField = document.getElementById("number");
const expMM = document.getElementById("exp-mm");
const expYY = document.getElementById("exp-yy");
const cvc = document.getElementById("cvc");
const cardChip = document.getElementById("card-chip");

//display cards

const dispCardNum = document.getElementById("disp-card-num");
const dispName = document.getElementById("disp-name");
const dispDateMM = document.getElementById("disp-date-mm");
const dispDateYY = document.getElementById("disp-date-yy");
const dispCvc = document.getElementById("disp-cvc");

//add if statments to add 0 if under 2 characters
function updateDispCard(userInput, disp) {
  disp.innerText = userInput;
}

function updateDispCard2(userInput, disp) {
  if (userInput.length < 2) {
    disp.innerText = "0" + userInput;
  } else {
    disp.innerText = userInput;
  }
}

//name field

nameField.addEventListener("focusout", () => {
  const nameFieldVal = nameField.value.trim();
  checkValue(nameFieldVal, nameField);
});

nameField.addEventListener("keyup", () => {
  const nameFieldVal = nameField.value.trim();
  setSuccessFor(nameField);
  updateDispCard(nameFieldVal, dispName);
  checkComplete();
});

//card number

// --Cleave.js formatting
const cleaveCC = new Cleave("#number", {
  creditCard: true,
  delimiter: " ",
  onCreditCardTypeChanged: function changeChip(type) {
    const cardFieldVal = cardField.value.trim();

    console.log(type);
    if (type === "visa") {
      cardChip.className = "fa-brands fa-cc-visa fa-lg";
    } else if (type === "mastercard") {
      cardChip.className = "fa-brands fa-cc-mastercard fa-lg";
    } else if (type === "amex") {
      cardChip.className = "fa-brands fa-cc-amex fa-lg";
    } else if (type === "uatp") {
      cardChip.className = "fa-brands fa-cc-amex fa-lg";
    }
  },
});

// --required
cardField.addEventListener("focusout", () => {
  const cardFieldVal = cardField.value.trim();
  checkValue(cardFieldVal, cardField);
  checkNumLen(cardFieldVal, cardField);
});

cardField.addEventListener("keyup", () => {
  const cardFieldVal = cardField.value.trim();
  setSuccessFor(cardField);
  updateDispCard(cardFieldVal, dispCardNum);
  checkComplete();
});

//cvc

const cleaveCvc = new Cleave("#cvc", {
  blocks: [3],
  numericOnly: true,
});

cvc.addEventListener("focusout", () => {
  const cvcVal = cvc.value.trim();
  checkValue(cvcVal, cvc);
  checkCvcLen(cvcVal);
});

cvc.addEventListener("keyup", () => {
  const cvcVal = cvc.value.trim();
  setSuccessFor(cvc);
  updateDispCard(cvcVal, dispCvc);
  checkComplete();
});

function checkCvcLen(value) {
  if (value.length < 3 && value.length > 0) {
    setErrorFor(cvc, "Not enough numbers");
  }
}

//set error and success fuctions

function setErrorFor(field, message) {
  const targetField = field;
  const parentDiv = field.parentElement;
  const small = parentDiv.querySelector("small");
  //change colour of box
  targetField.className = "error";
  //add error message
  small.innerText = message;
  small.className = "show";
}

function setSuccessFor(field) {
  const parentDiv = field.parentElement;
  const small = parentDiv.querySelector("small");

  //change colour of box
  field.className = "";
  //add error message
  small.className = "";
}

//check functions
function checkValue(fieldValue, field) {
  if (fieldValue === "") {
    //change box colour red
    //show error message and set
    setErrorFor(field, "Can't be blank");
  } else {
    setSuccessFor(field);
  }
}

function checkNumLen(value, field) {
  if (value.length > 1 && value.length < 17) {
    setErrorFor(field, "Not enough numbers.");
  } else if (value === "") {
    setErrorFor(field, "Can't be blank");
  } else {
    setSuccessFor(field);
  }
}

// EXP

const cleaveExpMM = new Cleave("#exp-mm", {
  blocks: [2],
  numericOnly: true,
});

const cleaveExpYY = new Cleave("#exp-yy", {
  blocks: [2],
  numericOnly: true,
});

expMM.addEventListener("focusout", () => {
  const expMMVal = expMM.value;
  if (expMM.value.length < 2 && expMMVal !== "") {
    expMM.value = "0" + expMMVal;
  }
  setTimeout(checkExp2, 20);
});

expMM.addEventListener("keyup", () => {
  const expMMVal = expMM.value;
  updateDispCard2(expMMVal, dispDateMM);
  setSuccessFor2(expMM);
  checkComplete();
});

expYY.addEventListener("focusout", () => {
  const expYYVal = expYY.value;
  if (expYY.value.length < 2 && expYYVal !== "") {
    expYY.value = "0" + expYYVal;
  }
  setTimeout(checkExp2, 20);
});
expYY.addEventListener("keyup", () => {
  expYYVal = expYY.value;
  setSuccessFor2(expYY);
  updateDispCard(expYYVal, dispDateYY);
  checkComplete();
});

expYY.addEventListener("click", () => {
  const expMMVal = expMM.value;
  if (expMMVal !== "") {
    setSuccessFor2(expMM);
    setSuccessFor2(expYY);
  }
});

function checkValidDate() {
  const expMMVal = expMM.value;
  const expYYVal = expYY.value;
  if (expMMVal > 12) {
    setErrorFor2(expMM, "Invalid date");
  } else if (expYYVal < 22 && expYYVal !== "") {
    setErrorFor2(expYY, "Date cannot be in the past");
  } else {
  }
}

function checkExp() {
  const expMMVal = expMM.value;
  const expYYVal = expYY.value;

  if (expMMVal.length === 2 && expYYVal.length < 2) {
    setSuccessFor2(expMM);
    setErrorFor2(expYY, "Can't be blank");
    checkValidDate();
  } else if (expMMVal.length < 2 && expYYVal.length === 2) {
    setSuccessFor2(expYY);
    setErrorFor2(expMM, "Can't be blank");
    checkValidDate();
  } else if (expMMVal.length < 2 && expYYVal.length < 2) {
    setErrorFor2(expMM, "Can't be blank");
    setErrorFor2(expYY, "Can't be blank");
    checkValidDate();
  } else {
    checkValidDate();
  }
}

function checkExp2() {
  const expMMVal = expMM.value;
  const expYYVal = expYY.value;

  if (document.activeElement === expYY || document.activeElement === expMM) {
    return;
  } else if (expMMVal.length === 2 && expYYVal.length < 2) {
    setSuccessFor2(expMM);
    setErrorFor2(expYY, "Can't be blank");
    checkValidDate();
  } else if (expMMVal.length < 2 && expYYVal.length === 2) {
    setSuccessFor2(expYY);
    setErrorFor2(expMM, "Can't be blank");
    checkValidDate();
  } else if (expMMVal.length < 2 && expYYVal.length < 2) {
    setErrorFor2(expMM, "Can't be blank");
    setErrorFor2(expYY, "Can't be blank");
    checkValidDate();
  } else {
    checkValidDate();
  }
}

function setErrorFor2(field, message) {
  const targetField = field;
  const parentDiv = field.parentElement;
  const grandparentDiv = parentDiv.parentElement;
  const small = grandparentDiv.querySelector("small");
  //change colour of box
  targetField.className = "error";
  //add error message
  small.innerText = message;
  small.className = "show";
}

function setSuccessFor2(field) {
  const parentDiv = field.parentElement;
  const grandparentDiv = parentDiv.parentElement;
  const small = grandparentDiv.querySelector("small");

  //change colour of box
  field.className = "";
  //add error message
  small.className = "";
}

// complete

const confirmBtn = document.getElementById("confirm-btn");
const complete = document.getElementById("complete");
const form = document.getElementById("form");
const completeImg = document.getElementById("complete-img");
const completeH1 = document.getElementById("complete-h1");
const completeP = document.getElementById("complete-p");

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

confirmBtn.addEventListener("click", () => {
  const nameFieldVal = nameField.value.trim();
  const cardFieldVal = cardField.value.trim();
  const expMMVal = expMM.value;
  const expYYVal = expYY.value;
  const cvcVal = cvc.value.trim();
  if (
    nameField.className === "" &&
    cardField.className === "" &&
    expMM.className === "" &&
    expYY.className === "" &&
    cvc.className === "" &&
    nameFieldVal !== "" &&
    cardFieldVal !== "" &&
    expMMVal !== "" &&
    expYYVal !== "" &&
    cvcVal.length === 3 &&
    confirmBtn.className === "active" &&
    confirmBtn.innerText === "Confirm"
  ) {
    form.className = "form hidden";
    complete.classList.add("show");
    completeImg.classList.add("show");
    completeH1.classList.add("show");
    completeP.classList.add("show");
    confirmBtn.innerText = "Continue";
  } else if (confirmBtn.innerText === "Continue") {
    confirmBtn.innerText = "Confirm";
    confirmBtn.className = "";
    form.className = "form";
    complete.classList.remove("show");
    completeImg.classList.remove("show");
    completeH1.classList.remove("show");
    completeP.classList.remove("show");
    nameField.value = "";
    cardField.value = "";
    expMM.value = "";
    expYY.value = "";
    cvc.value = "";
    dispCardNum.innerText = "0000 0000 0000 0000";
    dispName.innerText = "JANE APPLESEED";
    dispDateMM.innerText = "00";
    dispDateYY.innerText = "00";
    dispCvc.innerText = "000";
    cardChip.className = "";
  } else {
  }
});

function checkComplete() {
  const nameFieldVal = nameField.value.trim();
  const cardFieldVal = cardField.value.trim();
  const expMMVal = expMM.value;
  const expYYVal = expYY.value;
  const cvcVal = cvc.value.trim();
  if (
    nameField.className === "" &&
    cardField.className === "" &&
    expMM.className === "" &&
    expYY.className === "" &&
    cvc.className === "" &&
    nameFieldVal !== "" &&
    cardFieldVal !== "" &&
    expMMVal !== "" &&
    expYYVal !== "" &&
    cvcVal.length === 3
  ) {
    confirmBtn.className = "active";
  }
}
