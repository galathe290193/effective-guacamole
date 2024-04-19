$(document).ready(function () {
  console.log("Document is ready");

  const menuToggle = $("#menu-toggle");
  const dropdownContent = $("#dropdown-content");
  const icons = $(".dropdown-content a i");
  const modals = $(".modal");
  const closeButtons = $(".btn-close");

  let isOpen = false;
  let activeModal = null;

  menuToggle.on("click", toggleMenu);

  $(".dropdown-content a").on("click", function (e) {
    e.preventDefault();
    const modal = modals.eq($(".dropdown-content a").index(this));
    closeMenuAndOpenModal(modal);
  });

  closeButtons.on("click", closeModal);

  $(document).on("click", function (e) {
    if (!dropdownContent.is(e.target) && !menuToggle.is(e.target) && isOpen) {
      toggleMenu();
    }
  });

  function toggleMenu() {
    console.log("toggleMenu function called");
    isOpen = !isOpen;
    dropdownContent.toggleClass("active");
    menuToggle.toggleClass("active");

    if (isOpen) {
      animateIcons();
    } else {
      resetIcons();
    }
  }

  function animateIcons() {
    icons.each(function (index) {
      setTimeout(() => {
        $(this).addClass("animate");
      }, index * 200);
    });
  }

  function resetIcons() {
    icons.removeClass("animate");
  }

  function closeMenuAndOpenModal(modal) {
    dropdownContent.removeClass("active");
    menuToggle.removeClass("active");
    modal.css("display", "block");
    activeModal = modal;
  }

  function closeModal() {
    if (activeModal) {
      activeModal.css("display", "none");
      activeModal = null;
    }
  }

  $(document).on("click", function (e) {
    if ($(e.target).hasClass("modal")) {
      closeModal();
    }
  });
});

