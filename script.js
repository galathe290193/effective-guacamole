document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event triggered");

  const select = (selector) => document.querySelector(selector);
  const selectAll = (selector) => document.querySelectorAll(selector);

  const menuToggle = select("#menu-toggle");
  const dropdownContent = select("#dropdown-content");
  const links = selectAll(".dropdown-content a");
  const modals = selectAll(".modal");

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

  document.addEventListener("click", (e) => {
    if (!dropdownContent.contains(e.target) && e.target !== menuToggle) {
      toggleMenu();
    }
  });

  function toggleMenu() {
    console.log("toggleMenu function called");
    const isActive = dropdownContent.classList.contains("active");

    if (isActive) {
      dropdownContent.classList.remove("active");
      menuToggle.classList.remove("active");
      resetIcons();
    } else {
      dropdownContent.classList.add("active");
      menuToggle.classList.add("active");
      animateIcons();
    }
  }

  function animateIcons() {
    const icons = selectAll(".dropdown-content a i");
    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add("animate");
      }, index * 200);
    });
  }

  function resetIcons() {
    const icons = selectAll(".dropdown-content a i");
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
    if (e.target === this) {
      this.style.display = "none";
    }
  }
});

