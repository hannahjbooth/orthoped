// Search button in navigation bar

// const searchForm = document.getElementById('search');
// const query = document.getElementById('query');
// const googleSearch = 'https://www.google.com/search?q=site%3A+';
// const site = 'orthoped.co.uk';

// function produceGoogleSearch(event) {
//     event.preventDefault();
//     const url = googleSearch + site + '+' + query.value;
//     const newWindow = window.open(url, '_blank');
//     window.focus();
// }

// searchForm.addEventListener('submit', produceGoogleSearch);




// --- HEADER

    // If text is in the search input bar, keep new padding-bottom of 10px

    const searchInput = document.getElementById("query");

    searchInput.addEventListener("input", function() {
        const inputValue = searchInput.value;

        if (inputValue) {
            searchInput.classList.add("search-input-filled");
        } else {
            searchInput.classList.remove("search-input-filled");
        }
    });





