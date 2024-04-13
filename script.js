document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const homeModal = document.getElementById("home-modal");
    const aboutModal = document.getElementById("about-modal");
    const contactModal = document.getElementById("contact-modal");
  
    menuToggle.addEventListener("click", function () {
      homeModal.style.display = "block";
    });
  
    homeModal.addEventListener("click", function () {
      homeModal.style.display = "none";
    });
  
    aboutModal.addEventListener("click", function () {
      aboutModal.style.display = "none";
    });
  
    contactModal.addEventListener("click", function () {
      contactModal.style.display = "none";
    });
  });