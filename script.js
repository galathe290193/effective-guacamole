var theToggle = document.getElementById('toggle');
var theMenu = document.getElementById('menu');

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

theToggle.addEventListener('click', function() {
  toggleClass(this, 'on');
  toggleMenu();
});

function toggleMenu() {
  if (hasClass(theToggle, 'on')) {
    theMenu.style.opacity = 1;
    theMenu.style.visibility = 'visible';
  } else {
    theMenu.style.opacity = 0;
    theMenu.style.visibility = 'hidden';
  }
}

// Function to set toggle position
function setTogglePosition() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 20) { 
    theToggle.style.top = (scrollTop + 20) + 'px';
  } else {
    theToggle.style.top = '20px';
  }
}

function adjustMenuPosition() {
  var toggleRect = theToggle.getBoundingClientRect();
  var topPosition = toggleRect.bottom + 10; // Adjust this value as needed
  theMenu.style.top = topPosition + 'px';
}

// Initial call
setTogglePosition();

// Handle scroll to adjust toggle position
window.addEventListener('scroll', setTogglePosition);

// Open and close modals
document.addEventListener('click', function(e) {
  if (e.target.closest('#menu li a')) {
    closeModal();
    var modalId = e.target.closest('#menu li a').getAttribute('data-modal');
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
  } else if (!theMenu.contains(e.target) && !theToggle.contains(e.target)) {
    removeClass(theToggle, 'on');
    toggleMenu();
  }
});

function closeModal() {
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function(modal) {
    modal.style.display = 'none';
  });
}
