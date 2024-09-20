// Handling the feedback form required checkboxes

    // Pseudocode
    /*
    IF user selects one checkbox (of which name="discomfort")
        FOR all input elements of type "checkbox"
            IF input element has an attribute of required
                REMOVE all checkbox input elements' required attribute
    */

    // Select all checkbox inputs from the discomfort question
    let discomfortCheckboxes = document.getElementsByName("discomfort");


    // Function that removes required attribute from checkboxes
    function removeRequiredFromCheckboxes(checkboxes) {
        checkboxes.forEach(checkbox => {
            checkbox.removeAttribute('required');
        });
    }

    // Event listener added to all checkboxes to trigger function removing required attribute
    discomfortCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            removeRequiredFromCheckboxes(discomfortCheckboxes);
        });       
    });

// Handling the 'Other' checkbox's text input, so that it becomes required when the checkbox is selected

    // Pseudocode
    /*
    IF user selects 'Other' checkbox
        ADD required attribute to text input element
    IF user deselects 'Other' checkbox
        REMOVE required attribute to text input element
    */

    // Variables
    let otherCheckbox = document.getElementById("discomfort-other");
    let otherTextInput = document.getElementById("discomfort-other-text")

    // Function to handle required attribute
    function handleRequiredOnTextInput(checkbox) {
        if (checkbox.checked) {
            otherTextInput.setAttribute("required", "");
        } else {
            otherTextInput.removeAttribute("required");
        }
    }

    // Add an event listener to the otherCheckbx
    otherCheckbox.addEventListener("change", function() {
        handleRequiredOnTextInput(otherCheckbox);
    });


// When user clicks "Next" to access next step of the form, show next step, with all other steps hidden
// showNextStep()

// PSEUDOCODE
/*
LET a form have 5 steps
LET the user interface for the form show two sections
    LET the first section display a step
        LET the first step of the form be displayed upon page load
    LET the second section display a button section with 3 possible buttons
        IF the first step is displayed
            LET a button "Next" show the next step
        IF the second, third or fourth step are displayed
            LET two buttons "Back" and Next" be displayed
                IF the user clicks "Next"
                    LET the next step be displayed
                IF the user clicks "Back"
                    LET the previous step be displayed
        IF the fifth step is displayed
            LET two buttons "Back" and "Submit" be displayed
                IF the user clicks "Back"
                    LET the previous step be displayed
                IF the user clicks "Submit"
                    SEND the form to the server
*/

    // Handle user buttons

        // Variables storing each button
        const back = document.getElementById("back");
        const next = document.getElementById("next");
        const submit = document.getElementById("submit");
        // Array storing the buttons
        const formButtons = document.getElementsByClassName("feedback-form-button");
        const formButtonsArray = Array.from(formButtons);

        // Variable storing the steps of the form
        const formSteps = document.getElementsByClassName("step");
        console.log(formSteps);
        const formStepsArray = Array.from(formSteps);
        console.log(formStepsArray);



        // Function to get the currently visible step's index
        function getCurrentStepIndex(steps) {
            // ITERATE through the steps of the form
            for (let i = 0; i < steps.length; i++) {
                // IF the step is currently displayed (= doesn't have a class of hidden)
                if (!steps[i].classList.contains("hidden")) {
                    return i;
                }
            }
        }
        
        // Function to remove class of hidden from all buttons 
        function displayAllButtons(back, next, submit) {
            back.classList.remove("hidden");
            next.classList.remove("hidden");
            submit.classList.remove("hidden");       
        }
        // Function handling which buttons are displayed
        function handleButtonDisplay(index, steps) {
 
            // IF handling first step
            if (index === 0) {
                // Remove class of hidden from all buttons
                displayAllButtons(back, next, submit);
                // Apply a class of "hidden" to buttons back and submit
                back.classList.add("hidden");
                submit.classList.add("hidden");
            // IF handling last step
            } else if (index === steps.length - 1) {
                // Remove class of hidden from all buttons
                displayAllButtons(back, next, submit);
                // Apply a class of "hidden" to button next
                next.classList.add("hidden");
            // IF handling any other step
            } else {
                // Remove class of hidden from all buttons
                displayAllButtons(back, next, submit);
                // Apply a class of "hidden" to button submit
                submit.classList.add("hidden");
            }    
        }

        // Call function
        handleButtonDisplay(getCurrentStepIndex(formStepsArray), formStepsArray);


        // Handle "Next" button
        function showNextStep() {
            const currentStepIndex = getCurrentStepIndex(formStepsArray);
            if (currentStepIndex < formStepsArray.length - 1) {
                formStepsArray[currentStepIndex].classList.add("hidden");
                formStepsArray[currentStepIndex + 1].classList.remove("hidden");
                handleButtonDisplay(currentStepIndex + 1, formStepsArray);
            }
        }

        // Handle "Back" button
        function showPreviousStep() {
            const currentStepIndex = getCurrentStepIndex(formStepsArray);
            if (currentStepIndex > 0) {
                formStepsArray[currentStepIndex].classList.add("hidden");
                formStepsArray[currentStepIndex - 1].classList.remove("hidden");
                handleButtonDisplay(currentStepIndex - 1, formStepsArray);
            }
        }




        // IF user clicks next 
            // LET class of hidden be added to current step, aka step without a class of hidden
            // LET class of hidden be removed from next step
        // next.addEventListener ("click", showNextStep(formStepsArray));

    //
        
