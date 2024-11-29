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


    

    // function pageNavExists(main) {
    //     if (main.querySelector(".page-nav-ul")) {
    //         return true;
    //     }
    // }

    // function pageNavUl(main) {
    //     let ul = main.querySelector(".page-nav-ul");
    //     return ul;
    // }

    const sections = Array.from(document.querySelectorAll('section'));
    const pageNav = document.querySelector(".page-nav-ul");
    // console.log("testing page nav", pageNav)
    // let pageNavLinks = Array.from(pageNav.querySelectorAll('nav a'));
    // let pageNavLinks = returnsPageNavLinks();

    handlePageNav();


    function returnsPageNavLinks() {
        if (!pageNavExists) {
            console.log('no page nav');
            return;
        } else {
            return Array.from(pageNav.querySelectorAll('nav a'));
        }
    }

    function handlePageNav() {
        if (pageNavExists) {
            let pageNavLinks = returnsPageNavLinks();
            highlightActiveLink(pageNavLinks);
            window.addEventListener('scroll', highlightActiveLink);
        }
    }  


    if (!pageNavExists) {
        console.log('no page nav');
    }

    function pageNavExists() {
        if (pageNav === null) {
           return false; 
        }
        return true;
    }

    function sectionIsInView(sectionPosition) {
        if (sectionPosition.top >= 0 && sectionPosition.top < window.innerHeight / 1.3) {
            return true;
        }
        return false;
    }

    function returnsSectionPosition(section) {
        return section.getBoundingClientRect();
    }

    function returnsCurrentSection() {
        for (let section of sections) {
            let sectionPosition = returnsSectionPosition(section);
            if (sectionIsInView(sectionPosition)) {
                return section;
            }
        }
        return null;
    }

    function highlightActiveLink(pageNavLinks) {
        let currentSection = returnsCurrentSection();
        console.log("current section", currentSection);

        removePreviousActiveClass(pageNavLinks);
        addActiveClassTo(currentSection);
    }

    function removePreviousActiveClass() {
        let pageNavLinks = returnsPageNavLinks(pageNav);
        for (link of pageNavLinks) {
            link.classList.remove("active");
        }
    }

    function addActiveClassTo(currentSection) {
        let pageNavLinks = returnsPageNavLinks(pageNav);
        for (link of pageNavLinks) {
            if (link.getAttribute("href") === `/index.html#${currentSection.id}`) {
                console.log("link", link);
                link.classList.add('active');
            }
        }
    }





