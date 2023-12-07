export function initialForm(buttonPassword, firstPassword) {
  const formState = {
    buttonText: buttonPassword.innerText,
    inputType: firstPassword.type,
  };

  return formState;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function initialComparison() {
  const passwordComparison = {
    equal: "no",
    lowCase: "no",
    uppCase: "no",
    numbers: "no",
    tenChar: "no",
  };

  return passwordComparison;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderInputContainer(buttonPassword, firstPassword, secondPassword) {
  const stateOfForm = JSON.parse(localStorage.getItem("formState"));
  console.log(stateOfForm);
  buttonPassword.innerText = stateOfForm.buttonText;
  firstPassword.type = stateOfForm.inputType;
  secondPassword.type = stateOfForm.inputType;
}

function renderPasswordChecks(
  passwordComparison,
  equalSymbol,
  lowerSymbol,
  upperSymbol,
  numbersSymbol,
  tenCharactersSymbol
) {
  if (passwordComparison.equal === "yes") {
    equalSymbol.innerText = "✅";
  } else {
    equalSymbol.innerText = "❌";
  }
  if (passwordComparison.lowCase === "yes") {
    lowerSymbol.innerText = "✅";
  } else {
    lowerSymbol.innerText = "❌";
  }
  if (passwordComparison.uppCase === "yes") {
    upperSymbol.innerText = "✅";
  } else {
    upperSymbol.innerText = "❌";
  }
  if (passwordComparison.numbers === "yes") {
    numbersSymbol.innerText = "✅";
  } else {
    numbersSymbol.innerText = "❌";
  }
  if (passwordComparison.tenChar === "yes") {
    tenCharactersSymbol.innerText = "✅";
  } else {
    tenCharactersSymbol.innerText = "❌";
  }
}

export function renderErrorPopUp(
  event,
  errorContainer,
  firstPassword,
  upperTriangle,
  lowerTriangle,
  inputValue
) {
  errorContainer.style.display = "block";
  if (event.target.id === firstPassword.id) {
    errorContainer.style.top = "-25px";
    errorContainer.style.left = "40px";
    upperTriangle.style.display = "block";
  } else {
    errorContainer.style.top = "80px";
    errorContainer.style.left = "40px";
    lowerTriangle.style.display = "block";
  }
  event.target.value = inputValue.slice(0, -1);
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function isEqual(firstPassword, secondPassword) {
  if (firstPassword.value === secondPassword.value) {
    return "yes";
  } else {
    return "no";
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function allPasswordChecks(firstPassword) {
  const passwordComparison = initialComparison();
  passwordComparison.equal = "yes";

  const firstValue = firstPassword.value;
  let counterLow = 0;
  let counterUpp = 0;
  let counterNumber = 0;

  // :::::::::::::::::::::::::::::::::::::::::::::::::::

  for (let i = 0; i < firstValue.length; i++) {
    const isFirstValueLow = firstValue[i] === firstValue[i].toLowerCase();
    const isANumber = firstValue[i] == parseInt(firstValue[i]);
    if (isFirstValueLow && !isANumber) {
      counterLow++;
    }
  }
  if (counterLow >= 1) {
    passwordComparison.lowCase = "yes";
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::

  for (let i = 0; i < firstValue.length; i++) {
    const isFirstValueUpp = firstValue[i] === firstValue[i].toUpperCase();
    const isANumber = firstValue[i] == parseInt(firstValue[i]);
    if (isFirstValueUpp && !isANumber) {
      counterUpp++;
    }
  }
  if (counterUpp >= 1) {
    passwordComparison.uppCase = "yes";
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::

  for (let i = 0; i < firstValue.length; i++) {
    const isFirstValueNumber = firstValue[i] == parseInt(firstValue[i]);
    if (isFirstValueNumber) {
      counterNumber++;
    }
  }
  if (counterNumber >= 1) {
    passwordComparison.numbers = "yes";
  }
  // :::::::::::::::::::::::::::::::::::::::::::::::::::::

  if (firstValue.length >= 10) {
    passwordComparison.tenChar = "yes";
  }

  return passwordComparison;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function compareThePasswords(
  event,
  firstPassword,
  secondPassword,
  errorContainer,
  upperTriangle,
  lowerTriangle,
  symbolEqual,
  symbolLower,
  symbolUpper,
  symbolNumbers,
  symbolTenCharacters
) {
  const inputValue = event.target.value;

  const isValid = /^[a-zA-Z0-9üöäßÜÖÄ]+$/.test(inputValue);
  let comparisonOfPasswords;
  if (isValid) {
    console.log("Ja");
    if (firstPassword.value.length === secondPassword.value.length) {
      const arePasswordEqual = isEqual(firstPassword, secondPassword);
      if (arePasswordEqual === "yes") {
        console.log("They are Equal");
        comparisonOfPasswords = allPasswordChecks(firstPassword);
      }
    } else {
      comparisonOfPasswords = initialComparison();
    }
  } else if (event.target.value !== "") {
    console.log("Nein");
    renderErrorPopUp(
      event,
      errorContainer,
      firstPassword,
      upperTriangle,
      lowerTriangle,
      inputValue
    );
    comparisonOfPasswords = allPasswordChecks(firstPassword);
  } else if (event.target.value === "") {
    console.log("Leer");

    comparisonOfPasswords = initialComparison();
  }
  console.log(comparisonOfPasswords);
  localStorage.setItem(
    "passwordComparison",
    JSON.stringify(comparisonOfPasswords)
  );
  renderPasswordChecks(
    comparisonOfPasswords,
    symbolEqual,
    symbolLower,
    symbolUpper,
    symbolNumbers,
    symbolTenCharacters
  );
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function forAppJs() {
  const formular = document.querySelector("form");
  const passwordOne = document.querySelector("#password_one");
  const passwordTwo = document.querySelector("#password_two");
  const errorDiv = document.querySelector("#error_div");
  const passwordButton = document.querySelector("#password_button");
  const errorTriangleOne = document.querySelector("#error_triangle_one");
  const errorTriangleTwo = document.querySelector("#error_triangle_two");
  const symbolEqual = document.querySelector("#symbol_equal");
  const symbolLower = document.querySelector("#symbol_lower");
  const symbolUpper = document.querySelector("#symbol_upper");
  const symbolNumbers = document.querySelector("#symbol_numbers");
  const symbolTenCharacters = document.querySelector("#symbol_tenCharacters");

  localStorage.removeItem("password");

  const formState = initialForm(passwordButton, passwordOne);
  const comparisonOfPasswords = initialComparison();

  localStorage.setItem("formState", JSON.stringify(formState));
  localStorage.setItem(
    "passwordComparison",
    JSON.stringify(comparisonOfPasswords)
  );

  renderInputContainer(formState, passwordButton, passwordOne, passwordTwo);

  renderPasswordChecks(
    comparisonOfPasswords,
    symbolEqual,
    symbolLower,
    symbolUpper,
    symbolNumbers,
    symbolTenCharacters
  );

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  formular.addEventListener("click", function () {
    errorDiv.style.display = "none";
    errorTriangleOne.style.display = "none";
    errorTriangleTwo.style.display = "none";
  });

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  formular.addEventListener("keydown", function () {
    errorDiv.style.display = "none";
    errorTriangleOne.style.display = "none";
    errorTriangleTwo.style.display = "none";
  });

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  formular.addEventListener("input", function (event) {
    compareThePasswords(
      event,
      passwordOne,
      passwordTwo,
      errorDiv,
      errorTriangleOne,
      errorTriangleTwo,
      symbolEqual,
      symbolLower,
      symbolUpper,
      symbolNumbers,
      symbolTenCharacters
    );
  });

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  passwordButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("yyyyyyyyyyyyyyyy");
    const formState = JSON.parse(localStorage.getItem("formState"));
    if (formState.inputType === "password") {
      formState.buttonText = "Hide Passwords";
      formState.inputType = "text";
    } else {
      formState.buttonText = "Show Passwords";
      formState.inputType = "password";
    }
    console.log(formState);
    localStorage.setItem("formState", JSON.stringify(formState));
    renderInputContainer(passwordButton, passwordOne, passwordTwo);
  });
}
