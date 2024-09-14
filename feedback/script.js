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
// showNextStep()

// PSEUDOCODE
/*
// LET a form show two elements
//     LET the first element be a page of questions
//     LET the second element be an array
            LET array have 3 buttons
                LET button "Next"
        //         IF user clicks "Next"
        //             IF all required questions are answered
        //                 LET the question div's id increase by 1
                LET button "Back"
        //         IF user clicks "Back"
        //                 IF all required questions are answered
        //                     LET the question div's id decrease by 1
                LET button "Submit"
    //              IF user clicks "Submit" button
    //                 IF all required questions are answered
                            SEND form to server
*/
