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
    let otherTextInput = document.getElementById("discomfort-other-text")

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
            if (currentStep === firstStep) {
                hideAllButtons(buttons);
                displayButton(next);
            } else if (currentStep === lastStep) {
                hideAllButtons(buttons);
                displayButton(back);
                displayButton(submit);
            } else {
                hideAllButtons(buttons);
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

// Handle required questions

    // IF user clicks Next
        // CHECK if required questions are answered
            // IF they are
                // LET next step show
            // IF they aren't
                // DISABLE next button
                // SHOW "Answer required questions" message above buttons
                // SHOW "Required" message beside any unanswered question
                // REENABLE 

    // function checkIfRequiredQuestionsAreAnswered(requiredQuestions) {
    //     // GET which step
    //     // GET all required questions for that step

    //         // FOR each element types
    //         for (let question of requiredQuestions) {
    //             console.log(question.tagName);
    //         }
    //             // CHECK if question is answered
        
    //     // Question types are: select, input, radio, checkbox, textarea
    // }

    // checkIfRequiredQuestionsAreAnswered(requiredQuestions)

    let requiredQuestions = Array.from(currentStep.querySelectorAll("[required]"));

    console.log(requiredQuestions);

    // Function that returns present required question types in the console
    function checkEachElementTypeIsAnswered(requiredQuestions) {
        for (let question of requiredQuestions) {
            if (question.tagName === "INPUT") {
                console.log(question);
                // Run a function that checks if input is answered
            } else if (question.tagName === "SELECT") {
                console.log(question);
                // Run a function that checks if select is answered
            } else if (question.tagName === "RADIO") {
                console.log(question);
                // Run a function that checks if radio is answered
            } else if (question.tagName === "CHECKBOX") {
                console.log(question);
                // Run a function that checks if checkbox is answered
            } else if (question.tagName === "TEXTAREA") {
                console.log(question);
                // Run a function that checks if textarea is answered
            }
        }
    }

    checkEachElementTypeIsAnswered(requiredQuestions);

    // Function that checks if a radio based question has been answered

    function checksRadioIsClicked(question) {

        const radioButtons = Array.from(question.querySelectorAll('input[type="radio"]'));
        
        for (const radio of radioButtons) {
            if (radio.checked) {
                return;
            } else {
                // Disable "Next" button
                // Display "Answer required"
            }
        }

        // question.checkValidity()
    }




    
