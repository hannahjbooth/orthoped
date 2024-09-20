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
    console.log(discomfortCheckboxes);


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
