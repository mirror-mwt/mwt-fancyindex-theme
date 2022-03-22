window.addEventListener('DOMContentLoaded', event => {

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
