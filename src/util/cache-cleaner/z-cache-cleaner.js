window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log('error', msg, url, lineNo, columnNo, error)
    debugger;
// Reload the page to refresh the HTML and JavaScript files
window.location.href = window.location.href + '?timestamp=' + Date.now();

};