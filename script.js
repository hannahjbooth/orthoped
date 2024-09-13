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

    // --- SEARCH

    // IF "Search" is clicked
        // LET Search input area appear below the main navigation bar
        // LET all of main and footer content darken

    const searchLink = document.getElementById("search-link");
    const searchBox = document.getElementById("search-box");
    const areasToOverlay = document.getElementsByClassName("overlay");

    searchLink.addEventListener("click", function(event) {
        // prevent event default
        event.preventDefault();
        // Toggle appearance of search box when "Search" is clicked
        searchBox.classList.toggle("hidden");
        // Darken Main area of the page when "Search" is clicked
        for (const area of areasToOverlay) {
            area.classList.toggle("darkening-effect");
        }
    });

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





