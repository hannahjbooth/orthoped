handleBuggingTables();

function handleBuggingTables() {
    observeForBodyElement();
}

function observeForBodyElement() {
    const observer = new MutationObserver(() => {
        let body = document.getElementById('ecwid_body');
        if (body) {
            console.log("observed", body);
            hideBothBuggingTables(body);
            observer.disconnect();
        }
    })
    observer.observe(document.body, { childList: true, subtree: true });
}

function hideBothBuggingTables(body) {
        const table1 = body.querySelector('table.ecwid-productBrowser-innerTable:first-of-type');
        if (table1) {
            console.log('Hiding first table with class "ecwid-productBrowser-innerTable"');
            table1.style.display = 'none';
        }
    
        const table2 = body.querySelector('table.ecwid-productBrowser-auth-mini:first-of-type');
        if (table2) {
            console.log('Hiding first table with class "ecwid-productBrowser-auth-mini"');
            table2.style.display = 'none';
        }
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












