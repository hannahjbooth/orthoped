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


// Show next step of the form, and hide all other steps

// LET a form show a page of questions
    // IF user clicks "Next"
        // LET the page of questions change to number higher by one
    // IF user clicks "Back"
        // LET the page of questions change to number lower by one

// showNextStep()