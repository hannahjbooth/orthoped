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

            hidesAllRequiredMessages();

            if (checksIfRequiredInputIsMissing(requiredElements) === true) {
                returnsArrayOfUnansweredRequiredInputs(requiredElements);
                console.log("updated unanswered questions", returnsArrayOfUnansweredRequiredInputs(requiredElements));
                displaysRequiredMessageOnUnansweredQuestions(requiredElements);

            } else {
                currentStep.classList.add("hidden");
                nextStep.classList.remove("hidden");
                currentStep = nextStep;

                handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
            }
        }
    });


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
        
        let missingInput = false;

        for (const [key, values] of Object.entries(object)) {
            if (values.length > 0) {
                if (key === "select") {
                    for (let value of values) {
                        if (checksOptionIsSelected(value) === false) {
                            missingInput = true;
                        }
                    }                
                } else if (key === "radio") {
                    for (let value of values) {
                        if (checksRadioIsClicked(value) === false) {
                            missingInput = true;
                        }
                    }
                } else if (key === "checkbox") {
                    for (let value of values) {
                        if (checksCheckboxIsClicked(value) === false) {
                            missingInput = true;
                        }
                    }
                } else if (key === "text") {
                    for (let value of values) {
                        if (checksTextInputIsFilled(value) === false) {
                            missingInput = true;
                        }
                    }
                } else if (key === "textarea") {
                    for (let value of values) {
                        if (checksTextareaIsFilled(value) === false) {
                            missingInput = true;
                        }
                    }
                }
            }
        };
        return missingInput;
    }

    function returnsArrayOfUnansweredRequiredInputs(requiredElements) {
        let object = returnsObjectOfRequiredElementsGroupedByType(requiredElements);
        
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
        
        return unansweredRequiredInputs;
    }

    function displaysRequiredMessageOnUnansweredQuestions(requiredElements) {
        let unansweredRequiredInputs = returnsArrayOfUnansweredRequiredInputs(requiredElements);
        console.log("unansweredRequiredInputs:", unansweredRequiredInputs);

        for (let input of unansweredRequiredInputs) {
            let questionContainer = input.closest(".question");
            let requiredMessage = questionContainer.querySelector(".required-message");
            requiredMessage.classList.remove("hidden");
        }
    }

    function hidesAllRequiredMessages() {
        let allRequiredMessages = Array.from(document.querySelectorAll(".required-message"));
        console.log("testing all required message", allRequiredMessages);

        for (let message of allRequiredMessages) {
            message.classList.add("hidden");
        }
    }

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
                return true;
            }            
        }
        return false;
    }

    function checksCheckboxIsClicked(value) {  
        let allCheckboxes = returnsArrayOfAllAssociatedCheckboxes(value);
        for (let checkbox of allCheckboxes) {
            if (checkbox.checked) {
                return true;
            }
        }
        return false;
    }

    function checksOptionIsSelected(value) {
        if (value.value !== "") {
            return true;
        }       
        return false;
    }

    function checksTextInputIsFilled(value) {
            if (value.value !== "") {
                return true;
            }
        return false;
    }

    function checksTextareaIsFilled(value) {
            if (value.value !== "") {
                return true;
            }
        return false;
    }


    let feedbackForm = document.getElementById('feedback-form');
    // console.log('feedback form variable', feedbackForm);
    
    
    feedbackForm.addEventListener('click', function(event){
        let formData = new FormData(document.getElementById('feedback-form'));
        console.log(Object.fromEntries(formData));
    })

    // let submitButton = document.getElementById('submit')

    
    
