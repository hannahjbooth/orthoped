// Handling 'required' feature on checkbox based question

    let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    let allCheckboxesArray = Array.from(allCheckboxes);

    function returnsAllAssociatedCheckboxes(checkbox) {
        let checkboxParent = checkbox.parentElement;
        let checkboxes = Array.from(checkboxParent.querySelectorAll('input[type="checkbox"]'));
        return checkboxes;
    }

    function removeRequiredFromAssociatedCheckboxes(checkbox) {
        let checkboxes = returnsAllAssociatedCheckboxes(checkbox);
        for (let checkbox of checkboxes) {
            if (checkbox.hasAttribute("required")) {
                checkbox.removeAttribute("required");
            }
        }          
    }

    allCheckboxesArray.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            removeRequiredFromAssociatedCheckboxes(checkbox);
        })
    })

// Handling the 'Other' checkbox's text input, so that it becomes required when the checkbox is selected

    let otherCheckbox = document.getElementById("discomfort-other");
    let otherTextInput = document.getElementById("discomfort-other-text");

    function handleRequiredOnTextInput(checkbox) {
        if (checkbox.checked) {
            otherTextInput.setAttribute("required", "");
        } else {
            otherTextInput.removeAttribute("required");
        }
    }

    otherCheckbox.addEventListener("change", function() {
        handleRequiredOnTextInput(otherCheckbox);
    });


// Handling steps navigation

    const back = document.getElementById("back");
    const next = document.getElementById("next");
    const submit = document.getElementById("submit");
    const formButtons = [back, next, submit];

    const formSteps = Array.from(document.getElementsByClassName("step"));
    const firstStep = formSteps[0];
    const lastStep = formSteps[formSteps.length - 1];

    function displayButton(button) {
        button.classList.remove("hidden");
    }

    function hideAllButtons(buttons) {
        for (let button of buttons) {
            button.classList.add("hidden");
        }   
    }

    function getCurrentStep(steps) {
        for (let step of steps) {
            if (!step.classList.contains("hidden")) {
                return step;
            }
        }
    }

    function getCurrentStepIndex(steps) {
        for (let i = 0; i < steps.length; i++) {
            if (steps[i] === currentStep) {
                return i;
            }
        }
    }
    
    let currentStep = getCurrentStep(formSteps);

    function handleButtonsDisplay(currentStep, buttons, back, next, submit) {
        hideAllButtons(buttons);
        if (currentStep === firstStep) {
            displayButton(next);
        } else if (currentStep === lastStep) {
            displayButton(back);
            displayButton(submit);
        } else {
            displayButton(next);
            displayButton(back);
        }
    }
    
    handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);

    next.addEventListener("click", function(event) {

        let currentStepIndex = getCurrentStepIndex(formSteps, currentStep);
        let nextStep = formSteps[currentStepIndex + 1];

        if (nextStep) {
            let requiredElements = returnArrayOfInputsFromCurrentRequiredQuestions(); 
            returnsObjectOfRequiredElementsGroupedByType(requiredElements);

            if (checksIfRequiredInputIsMissing(requiredElements) === true) {
                console.log("Will run an alert on each unanswered question");
            } else {
                currentStep.classList.add("hidden");
                nextStep.classList.remove("hidden");
                currentStep = nextStep;

                handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
            }
        }
    })


    back.addEventListener("click", function(event) {
        
        let currentStepIndex = getCurrentStepIndex(formSteps, currentStep);
        let previousStep = formSteps[currentStepIndex - 1];

        if (previousStep) {

            currentStep.classList.add("hidden");
            previousStep.classList.remove("hidden");
            currentStep = previousStep;
            // Call the function to get required questions for the new current step
            let requiredElements = returnArrayOfInputsFromCurrentRequiredQuestions(); 
            returnsObjectOfRequiredElementsGroupedByType(requiredElements);
            checksIfRequiredInputIsMissing(requiredElements); // Validate the new current step

            handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
        }
    })

// Handle manual validation

    function returnArrayOfInputsFromCurrentRequiredQuestions() {
        let currentStep = getCurrentStep(formSteps);
        let requiredElements = Array.from(currentStep.querySelectorAll("[required]"));

        
        return requiredElements;
    }


    
    function removesSingleRadioInputs(requiredElements) {

    }


    function addsAllRadiosAssociatedWithRequiredRadios(requiredElements) {

    }

    let requiredElements = returnArrayOfInputsFromCurrentRequiredQuestions();
   
    function returnsObjectOfRequiredElementsGroupedByType(requiredElements) {
        let requiredElementsGroupedByType = {
            select: [],
            radio: [],
            checkbox: [],
            text: [],
            textarea: []
        };
        
        requiredElements.forEach(element => {
            if (element.tagName === "INPUT") {
                if (element.type === "radio") {
                    requiredElementsGroupedByType.radio.push(element);                    
                } else if (element.type === "checkbox") {
                    requiredElementsGroupedByType.checkbox.push(element);
                } else if (element.type === "text") {
                    requiredElementsGroupedByType.text.push(element);
                }
            } else if (element.tagName === "SELECT") {
                requiredElementsGroupedByType.select.push(element);
            } else if (element.tagName === "TEXTAREA") {
                requiredElementsGroupedByType.textarea.push(element);
            }
        });
        return requiredElementsGroupedByType;
    }

    function checksIfRequiredInputIsMissing(requiredElements) {

        let object = returnsObjectOfRequiredElementsGroupedByType(requiredElements);
        console.log("object:", object);
        
        let missingInput = false;

        for (const [key, values] of Object.entries(object)) {
            if (values.length > 0) {
                if (key === "select") {
                    for (let value of values) {
                        if (checksOptionIsSelected(value) === false) {
                            missingInput = true;
                            console.log("select missing input is:", missingInput)
                        }
                    }                
                } else if (key === "radio") {
                    for (let value of values) {
                        if (checksRadioIsClicked(value) === false) {
                            missingInput = true;
                            console.log("radio missing input is:", missingInput)
                        }
                    }
                } else if (key === "checkbox") {
                    for (let value of values) {
                        if (checksCheckboxIsClicked(value) === false) {
                            missingInput = true;
                            console.log("checkbox missing input is:", missingInput)
                        }
                    }
                } else if (key === "text") {
                    for (let value of values) {
                        if (checksTextInputIsFilled(value) === false) {
                            missingInput = true;
                            console.log("text missing input is:", missingInput)
                        }
                    }
                } else if (key === "textarea") {
                    for (let value of values) {
                        if (checksTextareaIsFilled(value) === false) {
                            missingInput = true;
                            console.log("textarea missing input is:", missingInput)
                        }
                    }
                }
            }
        };
        return missingInput;
    }

    function returnsArrayOfUnansweredRequiredInputs(requiredElements) {
        let object = returnsObjectOfRequiredElementsGroupedByType(requiredElements);
        console.log("object:", object);
        
        let unansweredRequiredInputs = [];

        for (const [key, values] of Object.entries(object)) {
            if (values.length > 0) {
                if (key === "select") {
                    for (let value of values) {
                        if (checksOptionIsSelected(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }                
                } else if (key === "radio") {
                    for (let value of values) {
                        if (checksRadioIsClicked(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                } else if (key === "checkbox") {
                    for (let value of values) {
                        if (checksCheckboxIsClicked(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                } else if (key === "text") {
                    for (let value of values) {
                        if (checksTextInputIsFilled(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                } else if (key === "textarea") {
                    for (let value of values) {
                        if (checksTextareaIsFilled(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                }
            }
        };
        console.log("unansweredRequiredInputs:", unansweredRequiredInputs);
        return unansweredRequiredInputs;
    }

    returnsArrayOfUnansweredRequiredInputs(requiredElements);

    function returnsArrayOfAllAssociatedRadios(value) {      
        let parentElement = value.parentElement;
        let allChildElements = Array.from(parentElement.children);
        let allChildRadios = [];
        allChildElements.forEach(child => {
            if (child.tagName === "INPUT" && child.type === "radio") {
                allChildRadios.push(child);
            }
        });
        return allChildRadios;
    }

    function returnsArrayOfAllAssociatedCheckboxes(value) {      
        let parentElement = value.parentElement;
        let allChildElements = Array.from(parentElement.children);
        let allChildCheckboxes = [];
        allChildElements.forEach(child => {
            if (child.tagName === "INPUT" && child.type === "checkbox") {
                allChildCheckboxes.push(child);
            }
        });
        return allChildCheckboxes;
    }

    function checksRadioIsClicked(value) {       
        let allRadios = returnsArrayOfAllAssociatedRadios(value);
        for (let radio of allRadios) {
            if (radio.checked) {
                console.log("radio q is answered");
                return true;
            }            
        }
        return false;
    }

    function checksCheckboxIsClicked(value) {  
        let allCheckboxes = returnsArrayOfAllAssociatedCheckboxes(value);
        for (let checkbox of allCheckboxes) {
            if (checkbox.checked) {
                console.log("checkbox q is answered");
                return true;
            }
        }
        return false;
    }

    function checksOptionIsSelected(value) {
        if (value.value !== "") {
            console.log("select q is answered");
            return true;
        }       
        return false;
    }

    function checksTextInputIsFilled(value) {
            if (value.value !== "") {
                console.log("text q is answered");
                return true;
            }
        return false;
    }

    function checksTextareaIsFilled(value) {
            if (value.value !== "") {
                console.log("textarea q is answered");
                return true;
            }
        return false;
    }

    function alertToMissingAnswer(question) {
        storesHiddenRequiredMessage(question).classList.remove("hidden");
    }

    function storesHiddenRequiredMessage(question) {
        let parentOfAnswer = question.parentElement;
        let requiredMessage = parentOfAnswer.getElementsByClassName("required")[0];        
    }



    
