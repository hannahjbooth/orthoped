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

// Page navigation dynamic highlighting

const sections = Array.from(document.querySelectorAll('section'));
const pageNav = document.querySelector(".page-nav-ul");

handlePageNav();

function returnsPageNavLinks() {
    return Array.from(pageNav.querySelectorAll('nav a'));
}

function handlePageNav() {
    if (pageNavExists()) {
        let pageNavLinks = returnsPageNavLinks();
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

// Accordeon

let questions = Array.from(document.getElementsByClassName('accordeon-button'));

for (let question of questions) {
    question.addEventListener('click', () => {
        let parent = question.parentElement;
        let answer = parent.querySelector('.accordeon-content');

        answer.classList.toggle('visible');
    })
}

// Mobile dropdown menu
let dropdownArea = document.getElementById('dropdown');
let dropdownButton = document.getElementById('dropdown-button');
let dropdownContent = document.getElementById('dropdown-content');
console.log(dropdownButton);
console.log(dropdownContent);

function toggleDropdownContent(menu) {
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    } else {
        menu.classList.remove('hidden');
    }
}

dropdownButton.addEventListener('click', function() {
    toggleDropdownContent(dropdownContent);
})

window.addEventListener('scroll', function() {
    dropdownContent.classList.add('hidden');
})

window.addEventListener('click', function(event) {
    if (!dropdownArea.contains(event.target)) {
        dropdownContent.classList.add('hidden');
        console.log('menu is not clicked on');
    }
})










