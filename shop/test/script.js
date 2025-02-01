/* <table cellspacing="0" cellpadding="0" class="ecwid-productBrowser-innerTable" style="width: 100%;"><tbody><tr><td align="left" style="vertical-align: top;"><table class="ecwid-productBrowser-auth-mini ecwid-productBrowser-auth-mini-horizontal" style=""><colgroup><col></colgroup><tbody><tr style="vertical-align: middle;"><td width="100%"><div class="ecwid-productBrowser-auth"><div></div></div></td></tr></tbody></table></td></tr><tr><td align="left" style="vertical-align: top;"><div style="display: none;" aria-hidden="true"><div class="gwt-HTML"></div></div></td></tr><tr><td align="left" style="vertical-align: top;"><div aria-hidden="true" style="display: none;"></div></td></tr></tbody></table> */

/* <table class="ecwid-productBrowser-auth-mini ecwid-productBrowser-auth-mini-horizontal" style=""><colgroup><col></colgroup><tbody><tr style="vertical-align: middle;"><td width="100%"><div class="ecwid-productBrowser-auth"><div></div></div></td></tr></tbody></table> */



/* Pseudocode

LET array allTables
LET current <body> be stored in a variable
    ITERATE through elements of <body> 
        IF element is <table>
            ADD to allTables
    ITERATE through allTables
        FOR each <table> of allTables
            LOG <table>
        IF allTables[index] > 2
            FIND a way to target the two above <table> elements

*/

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
        // Find the first table with the class 'ecwid-productBrowser-innerTable' within the body
        const table1 = body.querySelector('table.ecwid-productBrowser-innerTable:first-of-type');
        if (table1) {
            console.log('Hiding first table with class "ecwid-productBrowser-innerTable"');
            table1.style.display = 'none';
        }
    
        // Find the first table with the class 'ecwid-productBrowser-auth-mini' within the body
        const table2 = body.querySelector('table.ecwid-productBrowser-auth-mini:first-of-type');
        if (table2) {
            console.log('Hiding first table with class "ecwid-productBrowser-auth-mini"');
            table2.style.display = 'none';
        }
}











