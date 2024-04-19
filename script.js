document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event triggered");

  const menuToggle = document.getElementById("toggle");
  const dropdownContent = document.getElementById("menu");
  const links = Array.from(document.querySelectorAll("#menu ul a"));
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
    dropdownContent.classList.toggle("on");
    menuToggle.classList.toggle("on");
    
    if (isOpen) {
      animateIcons();
    } else {
      resetIcons();
    }
  }

  function animateIcons() {
    const icons = document.querySelectorAll("#menu ul a i");
    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add("animate");
      }, index * 200);
    });
  }

  function resetIcons() {
    const icons = document.querySelectorAll("#menu ul a i");
    icons.forEach((icon) => {
      icon.classList.remove("animate");
    });
  }

  function closeMenu() {
    dropdownContent.classList.remove("on");
    menuToggle.classList.remove("on");
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