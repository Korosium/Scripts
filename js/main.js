/**
 * The author name to put at the bottom of the page.
 */
const AUTHOR_NAME = "Korosium";

/**
 * Initialize the elements on the page before doing anything with them.
 */
const init = () => {
    document.getElementsByTagName("footer")[0].innerHTML += `<p>Copyright © ${new Date().getFullYear()} ${AUTHOR_NAME}</p>`;
}

/**
 * Run this function after the page has loaded.
 */
const main = () => {
    init();
}

window.onload = main;