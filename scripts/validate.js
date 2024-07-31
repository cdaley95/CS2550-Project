let phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;
const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form=null;
let successMsg=null;

/*initializes validation for the form and sets up
event listeners for input changes and form submission*/

function initValidation(formId, successId) {

    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);

    let inputs = document.querySelectorAll("input");
    for (input of inputs) {

        input.addEventListener("change", inputChanged );
        input.addEventListener("blur", inputBlurred);
    }
    form.addEventListener("submit", submitForm );
}

/*handles input change events, triggers valdation
on form inputs*/

function inputChanged(ev) {
    let el = ev.currentTarget;
    el.classList.add('was-validated');
}

/*Handles the blur event for form inputs.
Validates the individual field on losing focus.*/

function inputBlurred(ev) {
    let el = ev.currentTarget;
    let id = el.id;
    let type = el.type;
    
    if (type === 'text') {
        // For text-based inputs
        checkRequired(id, "This field is required");
        if (id === 'email') {
            checkFormat(id, "Email must be in *@*.* format", emailRegex);
        } else if (id === 'zip') {
            checkFormat(id, `Malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex);
        } else if (id === 'phone') {
            checkFormat(id, "Phone must have a 10 digit format", phoneRegex);
        } else if (id === 'state') {
            validateState(id, "Not a valid State, enter two digit code e.g., UT");
        }
    }
}

/*handles form submission, performs validation, and 
shows success message if form is valid*/

function submitForm(ev) {
    console.log("in submit");
    let form=ev.currentTarget;
    ev.preventDefault();
    ev.stopPropagation();
    let isValid = validateForm();
    if (!isValid) {
        let inputs = form.querySelectorAll("input");
        for (let input of inputs) {
            input.classList.add('was-validated');
        }
    } else {
        showSection('valform-success');
    }
}

/*validates all form feilds including checkboxes
and returns overall form validity*/

function validateForm() {
    let isValid = true;

    isValid &= checkRequired("firstname", "First Name is Required");
    isValid &= checkRequired("lastname", "Last Name is Required");
    isValid &= checkRequired("address", "Address is Required");
    isValid &= checkRequired("city", "City is Required");
    
    if(checkRequired("state", "State is Required")){
        validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }
    
    if (checkRequired("email", "Email Address is required")) {
        checkFormat("email", "Email format is bad", emailRegex);
    }
    if (checkRequired("zip", "Zip Code is Required")) {
        checkFormat("zip", `Malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex);
    }
    if (checkRequired("phone", "Phone is required")) {
        checkFormat("phone", "Phone format is bad, must use 10 digits", phoneRegex);
    }
    isValid &= validateCheckboxGroup("find-page", "At least one checkbox must be selected");
    return isValid;
}

/*handles validating checkboxes seperately from
the rest of the form, ensuring at least one box is checked*/

function validateCheckboxGroup(name, message) {
    let checkboxes = document.querySelectorAll(`input[name=${name}]`);
    let checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

    let valid = checkedCount > 0;
    let errorDiv = document.getElementById(`${name}-error`);

    if (valid) {
        if (errorDiv) {
            errorDiv.innerHTML = '';
            errorDiv.style.display = 'none';
        }
    } else {
        if (errorDiv) {
            errorDiv.innerHTML = message;
            errorDiv.style.display = 'block';
        }
    }
    return valid;
}

/*validadtes the state input field toensure they
match with the list of valid state abbreviations*/

function validateState(id, msg) {
    let el = document.getElementById(id);
    let value = el.value.trim().toUpperCase();
    let valid = stateAbbreviations.includes(value);
    setElementValidity(id, valid, msg);
}

/*validates the format of an input field using
regular expression*/

function checkFormat(id, msg, regex) {
    let el = document.getElementById(id);
    let value = el.value.trim();
    let valid = regex.test(value);
    setElementValidity(id, valid, msg);
    return valid;
}

/*checks if a required field is filled in and 
updates the validity status, with the exception
of the checkboxes that are handled seperately*/

function checkRequired(id, message) {
    let el = document.getElementById(id);
    let type = el.type;
    let valid = false;
    valid = el.value.trim() !== "";

    setElementValidity(id, valid, message);

    return valid;
}

/*updates the validity state of an element and displays or
hides the error message*/

function setElementValidity(id, valid, message) {
  let errorDiv = document.getElementById(id + "-error");

  if (valid) {
    if (errorDiv) {
        errorDiv.innerHTML = '';
        errorDiv.style.display = 'none';
    }
  } else {
    if (errorDiv) {
        errorDiv.innerHTML = message;
        errorDiv.style.display = 'block';
    }
  }
}