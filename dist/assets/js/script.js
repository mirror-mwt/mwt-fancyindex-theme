window.addEventListener("DOMContentLoaded",e=>{const t=document.body.querySelector("#sidebarToggle"),o=(t&&t.addEventListener("click",e=>{e.preventDefault(),document.body.classList.toggle("sb-sidenav-toggled"),localStorage.setItem("sb|sidebar-toggle",document.body.classList.contains("sb-sidenav-toggled"))}),document.body.querySelector("#list"));o.classList.add("table");var n=document.body.querySelector("#software-list").children;Array.from(n).forEach(function(e,t){window.location.href.startsWith(e.href)&&e.classList.add("active")}),3==window.location.pathname.split("/").length&&fetch("/assets/readme-text.json").then(e=>e.json()).then(e=>{window.location.pathname in e&&(document.getElementById("readme-text").innerHTML=e[window.location.pathname])})});