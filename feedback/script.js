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
            let requiredElements = returnArrayOfCurrentRequiredElements(); 
            returnsObjectOfrequiredElementsGroupedByType(requiredElements);

            if (checksIfRequiredInputIsMissing(requiredElements) === true) {
                console.log("Will run an alert on each unanswered question");
                console.log("Will also stop the next stage appearing")
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
            let requiredElements = returnArrayOfCurrentRequiredElements(); 
            returnsObjectOfrequiredElementsGroupedByType(requiredElements);
            checksIfRequiredInputIsMissing(requiredElements); // Validate the new current step

            handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
        }
    })

// Handle manual validation

    function returnArrayOfCurrentRequiredElements() {
        let currentStep = getCurrentStep(formSteps);
        let requiredElements = Array.from(currentStep.querySelectorAll("[required]"));
        console.log("required qs:", requiredElements);
        return requiredElements;
    }
    
    function returnsRadioButtonsInArraysByQuestion() {
        requiredElements.forEach(element => {
            if (element.tagName === "INPUT" && element.type === "radio") {
                let parentElement = element.parentElement();
                let radioArray = parentElement.forEach(element => {
                    
                })

            }
        })
    }

    let requiredElements = returnArrayOfCurrentRequiredElements();
    // console.log("all required questions:", requiredElements);

    // Radio problem: requiredElements doesn't collect all the radio buttons,
    // it only collects the radio button with an attribute of "required".

    // If I were to collect all the radio buttons, they woudln't be grouped by question.

    // For each radio based question, I need to produce a single array of multiple radio buttons,
    // and check for 1 of those radio buttons being selected.

    // To produce the array, I need to start with the radio button itself.

    // LET function returnArrayOfCurrentRequiredElements() return an array of all element with "required" attribute
        // LET that array be passed into a function:
            // IF array contains an element of tag name "input" and of type "radio"
                // GET parent element of that element
                    // GET all elements inside that parent element of tag name "input" and of type "radio"
                        // LET those elements form an array of radio buttons
                            // PUSH that array into 


    
    function returnsObjectOfrequiredElementsGroupedByType(requiredElements) {
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

        let object = returnsObjectOfrequiredElementsGroupedByType(requiredElements);
        console.log("object:", object);
        
        let missingInput = false;

        Object.keys(object).forEach(key => {

            const elements = object[key];

            if (elements.length > 0) {
                if (key === "select") {
                //console.log("test:", elements);
                if (checksOptionIsSelected(elements) === false) {
                    missingInput = true;
                    console.log("select:", missingInput)
                    }
                } else if (key === "radio") {
                    // console.log("test:", elements);
                    if (checksRadioIsClicked(elements) === false) {
                        missingInput = true;
                        console.log("radio:", missingInput)
                    }
                } else if (key === "checkbox") {
                    console.log("key:", elements);
                    if (checksCheckboxIsClicked(elements) === false) {
                        missingInput = true;
                    }
                } else if (key === "text") {
                    if (checksTextInputIsFilled(elements) === false) {
                        missingInput = true;
                    }
                } else if (key === "textarea") {
                    if (checksTextareaIsFilled(elements) === false) {
                        missingInput = true;
                    }
                }
            }
            
        });
        return missingInput;
    }

    //checksIfRequiredInputIsMissing(requiredElements);


    // checkEachElementTypeIsAnswered(requiredElements);
    

    // RADIO - Function that checks if a RADIO based question has been answered
    function checksRadioIsClicked(elements) {
        console.log("1: checking all elements are present:", elements);
        for (let element of elements) {
            console.log("2: checking all elements are present:", element);
            if (element.checked) {
                return true;
            }
        }
        // console.log("Nothing is checked") // DISABLE next button
        return false;
    }

    // CHECKBOX - Function that checks if a CHECKBOX based question has been answered
    function checksCheckboxIsClicked(elements) {
        for (let element of elements) {
            if (element.checked) {
                return true;
            }
        }
        //console.log("Nothing is checked"); // DISABLE next button
        return false;
    }

    // SELECT - Function that checks if a SELECT based question has been answered
    function checksOptionIsSelected(elements) {
        for (let element of elements) {
            if (element.value !== "") {
                return true;
            }
        }
        // console.log("Nothing is selected"); // DISABLE next button
        return false;
    }

    // TEXT - Function that checks if a TEXT based question has been answered
    function checksTextInputIsFilled(elements) {
        for (let element of elements) {
            if (element.value !== "") {
                return true;
            }
        }
        // console.log("Nothing is typed"); // DISABLE next button
        return false;
    }

    // TEXTAREA - Function that checks if a TEXTAREA based question has been answered
    function checksTextareaIsFilled(elements) {
        for (let element of elements) {
            if (element.value !== "") {
                return true;
            }
        }
        // console.log("Nothing is typed"); // DISABLE next button
        return false;
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
        // for (let question of requiredElements) {

        //     if (question.tagName === "INPUT") {

        //         // if (question.querySelec)

        //         // console.log("Input question:", question);
        //         // Run a function that checks if input is answered

        //     } else if (question.tagName === "SELECT") {

        //         // console.log("Select question:", question);
        //         // Run a function that checks if select is answered

        //     } else if (question.tagName === "RADIO") {

        //         // console.log("Radio question:", question)

        //         if (checksRadioIsClicked(question) === false) {
        //             missingInput = true;
        //             alertToMissingAnswer(question);
        //             // console.log("test")
        //         }
        //     } else if (question.tagName === "CHECKBOX") {

        //         // console.log("Checkbox question:", question);
        //         // Run a function that checks if checkbox is answered

        //     } else if (question.tagName === "TEXTAREA") {

        //         // console.log("Textarea question:", question);
        //         // Run a function that checks if textarea is answered
        //     }
        // }

        // for (let question of requiredElements) {
        //     if (missingInput = true) {
        //         alertToMissingAnswer(question);
        //     }
        // }
        
    


    




    // true or false

        // question.checkValidity()


    
