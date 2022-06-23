window.addEventListener("DOMContentLoaded", () => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Make current dir active
    const softwareLinks = document.getElementById('software-list').children;
    Array.from(softwareLinks).forEach(function (item, index) {
        if (window.location.href.startsWith(item.href)) {
            item.classList.add("active");
        }
    });
});

// Synchronous part
(() => {
    // Add table tag to table
    const tableElement = document.getElementById('list');
    tableElement.classList.add("table");

    // Get readme text
    if (window.location.pathname.split('/').length == 3) {
        // Hide table until we have readme (to avoid layout shift)
        tableElement.classList.add("d-none");
        fetch('/assets/readme-text.json')
            .then(response => response.json())
            .then(data => {
                if (window.location.pathname in data) {
                    const readmeElement = document.getElementById("readme-text");
                    readmeElement.innerHTML = `${data[window.location.pathname]}<hr>`;
                }

                // Display the table again
                tableElement.classList.remove("d-none");
            });
    }
})();
