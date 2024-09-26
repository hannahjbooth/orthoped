// Handling 'required' feature on checkbox for discomfort question

    let discomfortCheckboxes = document.getElementsByName("discomfort");

    function removeRequiredFromCheckboxes(checkboxes) {
        checkboxes.forEach(checkbox => {
            checkbox.removeAttribute('required');
        });
    }

    discomfortCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            removeRequiredFromCheckboxes(discomfortCheckboxes);
        });       
    });

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
            currentStep.classList.add("hidden");
            nextStep.classList.remove("hidden");
            currentStep = nextStep;

            // Call the function to get required questions for the new current step
            let requiredQuestions = returnArrayOfCurrentRequiredQuestions(); 

            checkEachElementTypeIsAnswered(requiredQuestions); // Validate the new current step
       

            handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
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
            let requiredQuestions = returnArrayOfCurrentRequiredQuestions(); 

            checkEachElementTypeIsAnswered(requiredQuestions); // Validate the new current step

            handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
        }
    })

// Handle manual validation

    function returnArrayOfCurrentRequiredQuestions() {
        let currentStep = getCurrentStep(formSteps);
        let requiredQuestions = Array.from(currentStep.querySelectorAll("[required]"));
        return requiredQuestions;
    }
    

    let requiredQuestions = returnArrayOfCurrentRequiredQuestions();


    

    // Function that returns present required question types in the console
    function checkEachElementTypeIsAnswered(requiredQuestions) {
        console.log(requiredQuestions);

        let missingInput = false;

        for (let question of requiredQuestions) {

    

            if (question.tagName === "INPUT") {

                // if (question.querySelec)

                // console.log("Input question:", question);
                // Run a function that checks if input is answered

            } else if (question.tagName === "SELECT") {

                // console.log("Select question:", question);
                // Run a function that checks if select is answered

            } else if (question.tagName === "RADIO") {

                // console.log("Radio question:", question)

                if (checksRadioIsClicked(question) === false) {
                    missingInput = true;
                    alertToMissingAnswer(question);
                    // console.log("test")
                }
            } else if (question.tagName === "CHECKBOX") {

                // console.log("Checkbox question:", question);
                // Run a function that checks if checkbox is answered

            } else if (question.tagName === "TEXTAREA") {

                // console.log("Textarea question:", question);
                // Run a function that checks if textarea is answered
            }
        }

        // for (let question of requiredQuestions) {
        //     if (missingInput = true) {
        //         alertToMissingAnswer(question);
        //     }
        // }
        
    }


    
    checkEachElementTypeIsAnswered(requiredQuestions);

    // RADIO --- Function that checks if a RADIO based question has been answered
    function checksRadioIsClicked(question) {

        const radioButtons = Array.from(question.querySelectorAll('input[type="radio"]'));
        
        for (const radio of radioButtons) {
            if (radio.checked) {
                return true;
            }
        }
        // console.log("Nothing is checked") // DISABLE next button
        return false;
    }

    function disableNextButton(next) {
        next.disabled = true;
    }
    
    function enableNextButton(next) {
        next.disabled = false;
    }

    function alertToMissingAnswer(question) {
        storesHiddenRequiredMessage(question).classList.remove("hidden");
    }

    function storesHiddenRequiredMessage(question) {
        // GET the parent element of the question
        let parentOfAnswer = question.parentElement;
        // console.log("parent:", parentOfAnswer);
        // GET the p of class "required" within the parent element 
        let requiredMessage = parentOfAnswer.getElementsByClassName("required")[0];
        // console.log("p:", requiredMessage);
        
    }



    // true or false

        // question.checkValidity()


    
