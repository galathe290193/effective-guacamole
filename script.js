document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const dropdownContent = document.getElementById("dropdown-content");
  const homeLink = document.getElementById("home-link");
  const aboutLink = document.getElementById("about-link");
  const contactLink = document.getElementById("contact-link");
  const homeModal = document.getElementById("home-modal");
  const aboutModal = document.getElementById("about-modal");
  const contactModal = document.getElementById("contact-modal");

  menuToggle.addEventListener("click", function () {
    if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
      dropdownContent.classList.add("active");
      menuToggle.classList.add("active");
    } else {
      dropdownContent.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });

  homeLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.classList.remove("active");
    homeModal.style.display = "block";
  });

  aboutLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.classList.remove("active");
    aboutModal.style.display = "block";
  });

  contactLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.classList.remove("active");
    contactModal.style.display = "block";
  });

  // Fermer les modales en cliquant dessus
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