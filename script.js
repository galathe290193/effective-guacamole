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
    console.log("Menu toggle clicked");
    toggleMenu();
  });

  function toggleMenu() {
    console.log("toggleMenu function called");
    if (dropdownContent.classList.contains("active")) {
      dropdownContent.classList.remove("active");
      menuToggle.classList.remove("active");
    } else {
      dropdownContent.classList.add("active");
      menuToggle.classList.add("active");
      animateIcons();  // Déclenche l'animation lorsque le menu est ouvert
    }
  }

  function animateIcons() {
    console.log("animateIcons function called");
    homeLink.querySelector("i").classList.add("animate");
    setTimeout(() => {
      aboutLink.querySelector("i").classList.add("animate");
    }, 200);
    setTimeout(() => {
      contactLink.querySelector("i").classList.add("animate");
    }, 400);
  }

  homeLink.addEventListener("click", function (e) {
    console.log("Home link clicked");
    e.preventDefault();
    closeMenuAndOpenModal(homeModal);
  });

  aboutLink.addEventListener("click", function (e) {
    console.log("About link clicked");
    e.preventDefault();
    closeMenuAndOpenModal(aboutModal);
  });

  contactLink.addEventListener("click", function (e) {
    console.log("Contact link clicked");
    e.preventDefault();
    closeMenuAndOpenModal(contactModal);
  });

  function closeMenuAndOpenModal(modal) {
    console.log("closeMenuAndOpenModal function called");
    dropdownContent.classList.remove("active");
    menuToggle.classList.remove("active");
    modal.style.display = "block";
  }

  // Fermer les modales en cliquant dessus
  homeModal.addEventListener("click", closeModal);
  aboutModal.addEventListener("click", closeModal);
  contactModal.addEventListener("click", closeModal);

  function closeModal(e) {
    console.log("Modal clicked");
    if (e.target === this) {
      this.style.display = "none";
    }
  }

  // Fermer le menu en cliquant en dehors
  document.addEventListener("click", function (e) {
    console.log("Document clicked");
    if (!dropdownContent.contains(e.target) && e.target !== menuToggle) {
      dropdownContent.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});
