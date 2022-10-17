const nameField = document.getElementById("name");
const cardField = document.getElementById("number");
const expMM = document.getElementById("exp-mm");
const expYY = document.getElementById("exp-yy");

//name field

nameField.addEventListener("focusout", () => {
  const nameFieldVal = nameField.value.trim();
  checkValue(nameFieldVal, nameField);
});

nameField.addEventListener("keyup", () => {
  setSuccessFor(nameField);
});

//card number

// --Cleave.js formatting
const cleaveCC = new Cleave("#number", {
  creditCard: true,
  delimiter: " ",
  onCreditCardTypeChanged: function (type) {},
});

// --required
cardField.addEventListener("focusout", () => {
  const cardFieldVal = cardField.value.trim();
  checkValue(cardFieldVal, cardField);
  checkNumLen(cardFieldVal, cardField);
});

cardField.addEventListener("keyup", () => {
  setSuccessFor(cardField);
});

// exp month
expMM.addEventListener("focusout", () => {
  const expMMVal = expMM.value.trim();
  checkValue2(expMMVal, expMM);
});

expMM.addEventListener("keyup", () => {
  setSuccessFor2(expMM);
});

// exp year

expYY.addEventListener("focusout", () => {
  const expYYVal = expYY.value.trim();
  checkValue2(expYYVal, expYY);
});

expYY.addEventListener("keyup", () => {
  setSuccessFor2(expYY);
});

//check functions

function checkValue(fieldValue, field) {
  if (fieldValue === "") {
    //change box colour red
    //show error message and set
    setErrorFor(field, "Required");
  } else {
    setSuccessFor(field);
  }
}

function checkValue2(fieldValue, field) {
  if (fieldValue === "") {
    //change box colour red
    //show error message and set
    setErrorFor2(field, "Required");
  } else {
    setSuccessFor2(field);
  }
}

function checkNumLen(value, field) {
  if (value.length > 1 && value.length < 19) {
    setErrorFor(field, "Not enough numbers.");
  } else if (value === "") {
    setErrorFor(field, "Required.");
  } else {
    setSuccessFor(field);
    console.log(value);
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
  console.log(small.className + message);
}

function setSuccessFor(field) {
  const parentDiv = field.parentElement;
  const small = parentDiv.querySelector("small");

  //change colour of box
  field.className = "";
  //add error message
  small.className = "";
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
  console.log(small.className + message);
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
