document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event triggered");

  const menuToggle = document.getElementById("menu-toggle");
  const dropdownContent = document.getElementById("dropdown-content");
  const links = Array.from(document.querySelectorAll(".dropdown-content a"));
  const modals = Array.from(document.querySelectorAll(".modal"));
  const closeButtons = document.querySelectorAll(".btn-close");

  let isOpen = false;
  let activeModal = null;

  menuToggle.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      openModal(modals[links.indexOf(link)]);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("click", (e) => {
    if (!dropdownContent.contains(e.target) && e.target !== menuToggle && isOpen) {
      toggleMenu();
    }
  });

  function toggleMenu() {
    console.log("toggleMenu function called");
    isOpen = !isOpen;
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
        icon.parentElement.classList.add("active"); // Afficher l'icône
      }, index * 200);
    });
  }
  
  function resetIcons() {
    const icons = document.querySelectorAll(".dropdown-content a i");
    icons.forEach((icon) => {
      icon.classList.remove("animate");
      icon.parentElement.classList.remove("active"); // Masquer l'icône
    });
  }

  function closeMenu() {
    dropdownContent.classList.remove("active");
    menuToggle.classList.remove("active");
    isOpen = false;
  }

  function openModal(modal) {
    modal.style.display = "block";
    activeModal = modal;
  }

  function closeModal() {
    if (activeModal) {
      activeModal.style.display = "none";
      activeModal = null;
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  });
});
