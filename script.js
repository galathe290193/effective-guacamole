var theToggle = document.getElementById('toggle');

// based on Todd Motto functions
// https://toddmotto.com/labs/reusable-js/

// hasClass
function hasClass(elem, className) {
	return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
    	elem.className += ' ' + className;
    }
}
// removeClass
function removeClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
// toggleClass
function toggleClass(elem, className) {
	var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0 ) {
            newClass = newClass.replace( " " + className + " " , " " );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}

theToggle.onclick = function() {
   toggleClass(this, 'on');
   return false;
}

// Function to set toggle position
function setTogglePosition() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 20) { // Vous pouvez ajuster cette valeur selon vos besoins
      theToggle.style.top = (scrollTop + 20) + 'px';
  } else {
      theToggle.style.top = '20px';
  }
}

// Appel de la fonction pour la première fois
setTogglePosition();

// Gérer le scroll pour ajuster la position du toggle
window.addEventListener('scroll', setTogglePosition);

document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('#menu li a');
    var homeModal = document.getElementById('home-modal');
    var aboutModal = document.getElementById('about-modal');
    var contactModal = document.getElementById('contact-modal');
    var modals = document.querySelectorAll('.modal');

    // Function to close all modals
    function closeModal() {
        modals.forEach(function (modal) {
            modal.style.display = 'none';
        });
    }

    // Open Home Modal
    menuLinks[0].addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
        homeModal.style.display = 'block';
    });

    // Open About Modal
    menuLinks[1].addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
        aboutModal.style.display = 'block';
    });

    // Open Contact Modal
    menuLinks[2].addEventListener('click', function (e) {
        e.preventDefault();
        closeModal();
        contactModal.style.display = 'block';
    });

    // Close modal on button click
    var closeButtons = document.querySelectorAll('.btn-close');
    closeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            closeModal();
        });
    });

    // Close modal on outside click
    modals.forEach(function (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
});
