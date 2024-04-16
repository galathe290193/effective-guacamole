document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event triggered");

  const menuToggle = document.getElementById("menu-toggle");
  const dropdownContent = document.getElementById("dropdown-content");
  const links = Array.from(document.querySelectorAll(".dropdown-content a")); // Convertit NodeList en tableau
  const modals = document.querySelectorAll(".modal");
  const modalCloses = document.querySelectorAll(".modal-close"); // Sélection des boutons de fermeture

  let isOpen = false; // Variable pour suivre l'état du menu

  menuToggle.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenuAndOpenModal(modals[links.indexOf(link)]);
    });
  });

  modalCloses.forEach((close) => {
    close.addEventListener("click", closeModal);
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", closeModalOutside);
  });

  document.addEventListener("click", (e) => {
    if (!dropdownContent.contains(e.target) && e.target !== menuToggle && isOpen) {
      toggleMenu();
    }
  });

  function toggleMenu() {
    console.log("toggleMenu function called");
    isOpen = !isOpen; // Inverse l'état du menu
    dropdownContent.classList.toggle("active");
    menuToggle.classList.toggle("active");
    
    if (isOpen) {
      animateIcons();
    } else {
      resetIcons();
    }
  }

  function animateIcons() {
    const icons = document.querySelectorAll(".dropdown-content a i");
    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add("animate");
      }, index * 200);
    });
  }

  function resetIcons() {
    const icons = document.querySelectorAll(".dropdown-content a i");
    icons.forEach((icon) => {
      icon.classList.remove("animate");
    });
  }

  function closeMenuAndOpenModal(modal) {
    dropdownContent.classList.remove("active");
    menuToggle.classList.remove("active");
    modal.style.display = "block";
  }

  function closeModal() {
    const activeModal = document.querySelector(".modal.display-block");
    activeModal.style.display = "none";
  }

  function closeModalOutside(e) {
    if (e.target === this) {
      this.style.display = "none";
    }
  }
});

