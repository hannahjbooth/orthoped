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


// Handle highlighting of BUY or SHOPPING BAG on shop page

// IF #webshop is hovered over
    // LET titles associated to #webshop be highlighted
    // IF page showing is BUY (known by class selector)
        // IF title highlighted is not BUY
            // LET highilhgting be removed




// let shopPage = document.getElementById('my-store-111372723');
// console.log('test 2', shopPage);

// let buyPage = document.querySelector('.ec-storefront-v3');
// console.log('testing buy page', buyPage);
// let shoppingBagPage = document.querySelector('.ec-storefront-v3');
// console.log('testing shopping bag page', shoppingBagPage);


// document.addEventListener('DOMContentLoaded', function() {
//     let shopPage = document.getElementById('my-store-111372723');
//     console.log('test 2', shopPage);
//     let buyPage = shopPage.querySelector('.ec-storefront-v3');
//     console.log('testing buy page', buyPage);
//     let shoppingBagPage = shopPage.querySelector('.ec-storefront-v2');
//     console.log('testing shopping bag page', shoppingBagPage);
// })



function returnsUrl() {
    console.log(window.location.href);
    return window.location.href;
}

returnsUrl();


// IF user clicks on Buy
    // LET Shopping Cart lose its class of active
    // LET Buy gain a class of active
// IF user clicks on Shopping Cart
    // LET Buy lose its class of active
    // LET Shopping Cart gain a class of active

let buyButton = document.getElementById('buy-button');
let cartButton = document.getElementById('cart-button');

buyButton.addEventListener('click', function() {
    let buyButton = document.getElementById('buy-button');
    let cartButton = document.getElementById('cart-button');

    buyButton.classList.add('active');
    cartButton.classList.remove('active');
});

cartButton.addEventListener('click', function() {
    let cartButton = document.getElementById('cart-button');
    let buyButton = document.getElementById('buy-button');

    cartButton.classList.add('active');
    buyButton.classList.remove('active');
});

let webshopSection = document.getElementById('webshop');
console.log('webshop', webshopSection);

function highlightsWebshopSectionByUrl() {
    if (returnsCurrentSection() === webshopSection) {
        console.log('current section is webshop,', webshopSection);

        if (window.location.href === 'http://127.0.0.1:3000/shop/test/index.html#!/~/cart') {
            console.log('current dynamic page is cart');
            cartButton.classList.add('active');
            buyButton.classList.remove('active');
        } else if (window.location.href === 'http://127.0.0.1:3000/shop/test/index.html#!/~/') {
            console.log('current dynamic page is buy');
            buyButton.classList.add('active');
            cartButton.classList.remove('active');
        }
    }
}

// let testLink = document.getE

window.addEventListener('popstate', () => {
    console.log('URL changed:', window.location.href);
});

// All links on site to Buy section WITH BREADCRUMBS
    // <a class="breadcrumbs__link ec-link ec-link--muted " href="#!/c/0">Store</a>
    // <a class="ec-link" tabindex="0">Continue shopping</a>
    // <a href="#!/~/" id="buy-button" class="active">BUY</a>
    // <a href=" " class="breadcrumbs__link ec-link ec-link--muted breadcrumbs__link--last">Back to catalog</a>
    // <a href=" " class="breadcrumbs__link ec-link ec-link--muted breadcrumbs__link--last">Back to catalog</a>

// WITHOUT BREADCRUMBS, actions to check
    // CLICKING on checkout on a product
        // url changes to /cart


// other dynamic links that can be clicked:
    // Store ()
    // Continue Shopping
    // Shopping Cart
    // Shopping bag


// Accordeon

let questions = Array.from(document.getElementsByClassName('accordeon-button'));

for (let question of questions) {
    question.addEventListener('click', () => {
        let parent = question.parentElement;
        let answer = parent.querySelector('.accordeon-content');

        answer.classList.toggle('visible');
    })
}





