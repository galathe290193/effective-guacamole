document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const dropdownContent = document.getElementById("dropdown-content");
  const homeModal = document.getElementById("home-modal");
  const aboutModal = document.getElementById("about-modal");
  const contactModal = document.getElementById("contact-modal");
  const homeLink = document.getElementById("home-link");
  const aboutLink = document.getElementById("about-link");
  const contactLink = document.getElementById("contact-link");

  menuToggle.addEventListener("click", function () {
    if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
      dropdownContent.style.display = "block";
      menuToggle.classList.add("active");
    } else {
      dropdownContent.style.display = "none";
      menuToggle.classList.remove("active");
    }
  });

  homeLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.style.display = "none";
    homeModal.style.display = "block";
    menuToggle.classList.remove("active");
  });

  aboutLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.style.display = "none";
    aboutModal.style.display = "block";
    menuToggle.classList.remove("active");
  });

  contactLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.style.display = "none";
    contactModal.style.display = "block";
    menuToggle.classList.remove("active");
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
