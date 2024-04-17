document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event triggered");

  const menuToggle = document.getElementById("menu-toggle");
  const dropdownContent = document.getElementById("dropdown-content");
  const links = Array.from(document.querySelectorAll(".dropdown-content a"));
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".btn-close");

  let isOpen = false;

  menuToggle.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenuAndOpenModal(modals[links.indexOf(link)]);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", closeModal);
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

  function closeModal(e) {
    if (e.target === this || e.target.classList.contains("btn-close")) {
      const activeModal = document.querySelector(".modal");
      activeModal.style.display = "none";
    }
  }
});