// Search bar

const searchLink = document.getElementById("search-link");
const searchBox = document.getElementById("search-box");
const overlay = document.getElementById("overlay");

searchLink.addEventListener("click", function(event) {
    event.preventDefault();
    toggleSearchBox();
    toggleDarkeningEffect();
});

function toggleSearchBox() {
    searchBox.classList.toggle("hidden");
}

function toggleDarkeningEffect() {
    overlay.classList.toggle("darkening-effect");
}


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
        return Array.from(pageNav.querySelectorAll('nav a'));
    }

    function handlePageNav() {
        if (pageNavExists()) {
            let pageNavLinks = returnsPageNavLinks();
            console.log(pageNavLinks);
            highlightActiveLink(pageNavLinks);
            window.addEventListener('scroll', highlightActiveLink);
        }
    }  

    function pageNavExists() {
        if (pageNav === null) {
           return false; 
        }
        return true;
    }

    function sectionIsInView(sectionPosition) {
        if (sectionPosition.top >= 0 && sectionPosition.top < window.innerHeight / 1.8) {
            return true;
        } else if (sectionPosition.top < 0 && sectionPosition.bottom > window.innerHeight) {
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
        // console.log("current section", currentSection);

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
        if (!currentSection) {
            return;
        }
        let pageNavLinks = returnsPageNavLinks(pageNav);
        for (link of pageNavLinks) {
            if (link.getAttribute("href") === `#${currentSection.id}`) {
                link.classList.add('active');
            } 
        }
    }





