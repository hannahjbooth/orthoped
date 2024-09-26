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

    function handleButtonsDisplay(currentStep, buttons, back, next, submit, steps) {
        for (let step of steps) {
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
    }

    handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);

    next.addEventListener("click", function(event) {

        let currentStepIndex = getCurrentStepIndex(formSteps, currentStep);
        let nextStep = formSteps[currentStepIndex + 1];

        if (nextStep) {
            currentStep.classList.add("hidden");
            nextStep.classList.remove("hidden");
            currentStep = nextStep;
            
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

            handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
        }
    })


    let requiredQuestions = Array.from(currentStep.querySelectorAll("[required]"));

    console.log("Required questions:", requiredQuestions);

    // Function that returns present required question types in the console
    function checkEachElementTypeIsAnswered(requiredQuestions) {

        let missingInput = false;

        for (let question of requiredQuestions) {
            

            if (question.tagName === "INPUT") {
                console.log(question);
                // Run a function that checks if input is answered
            } else if (question.tagName === "SELECT") {
                console.log(question);
                // Run a function that checks if select is answered
            } else if (question.tagName === "RADIO") {
                if (checksRadioIsClicked(question) === false) {
                    missingInput = true;
                    // Run a function that passes question as an argument and enables a user alert               
                    }
            } else if (question.tagName === "CHECKBOX") {
                console.log(question);
                // Run a function that checks if checkbox is answered
            } else if (question.tagName === "TEXTAREA") {
                console.log(question);
                // Run a function that checks if textarea is answered
            }
        }
        if (missingInput = true) {
            // Run a function that DISABLES the "next" button
            disableNextButton(next);
        }
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

    function alertToMissingAnswer(question) {
        // GET the parent element of the question
        let question.parentElement;
    }


    // true or false

        // question.checkValidity()


    
