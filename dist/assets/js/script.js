window.addEventListener("DOMContentLoaded",event=>{const sidebarToggle=document.body.querySelector("#sidebarToggle");if(sidebarToggle){sidebarToggle.addEventListener("click",event=>{event.preventDefault();document.body.classList.toggle("sb-sidenav-toggled");localStorage.setItem("sb|sidebar-toggle",document.body.classList.contains("sb-sidenav-toggled"))})}const tableElement=document.body.querySelector("#list");tableElement.classList.add("table");const softwareLinks=document.body.querySelector("#software-list").children;Array.from(softwareLinks).forEach(function(item,index){if(window.location.href.startsWith(item.href)){item.classList.add("active")}})});