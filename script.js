document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event triggered");

  const menuToggle = document.getElementById("menu-toggle");
  const dropdownContent = document.getElementById("dropdown-content");
  const links = Array.from(document.querySelectorAll(".dropdown-content a"));
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".btn-close");

  let isOpen = false;
  let activeModal = null;

  menuToggle.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("mouseenter", (e) => {
      const description = e.target.getAttribute("data-description");
      if (description) {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = description;
        e.target.appendChild(tooltip);
        positionTooltip(e.target, tooltip);
      }
    });

    link.addEventListener("mouseleave", (e) => {
      const tooltip = e.target.querySelector(".tooltip");
      if (tooltip) {
        tooltip.remove();
      }
    });

    link.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenuAndOpenModal(modals[links.indexOf(link)]);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("click", (e) => {
    if (!dropdownContent.contains(e.target) && e.target !== menuToggle && isOpen) {
      toggleMenu();
    }
    if (e.target.classList.contains("modal")) {
      closeModal();
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
    activeModal = modal;
  }

  function closeModal() {
    if (activeModal) {
      activeModal.style.display = "none";
      activeModal = null;
    }
  }

  function positionTooltip(target, tooltip) {
    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width + 10}px`;
    tooltip.style.top = `${rect.top}px`;
  }
});

