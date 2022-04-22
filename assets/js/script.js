function runifDOM(func) {
    if (document.readyState === "complete" | document.readyState === "interactive") {
        func();
    }
    else {
        window.addEventListener("DOMContentLoaded", () => {
            func();
        });
    }
};


runifDOM( () => {
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

    // Add table tag to table
    const tableElement = document.body.querySelector('#list');
    tableElement.classList.add("table");

    // Make current dir active
    const softwareLinks = document.body.querySelector('#software-list').children;
    Array.from(softwareLinks).forEach(function (item, index) {
        if (window.location.href.startsWith(item.href)) {
            item.classList.add("active");
        };
    });
});

// Get readme text
(() => {
    if (window.location.pathname.split('/').length == 3) {
        fetch('/assets/readme-text.json')
            .then(response => response.json())
            .then(data => {
                if (window.location.pathname in data) {
                    runifDOM(() => {
                        var readmeElement = document.getElementById("readme-text");
                        readmeElement.innerHTML = data[window.location.pathname];
                    });
                }
            });
    };
})();
