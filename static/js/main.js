document.addEventListener("DOMContentLoaded", function () {
    // Load header
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header-placeholder").innerHTML = data);
    // Load main
    fetch("main.html")
        .then(response => response.text())
        .then(data => document.getElementById("main-content").innerHTML = data);
    // Load footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);
});