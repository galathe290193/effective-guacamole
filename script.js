var theToggle = document.getElementById('toggle');
var theMenu = document.getElementById('menu');
var modals = document.querySelectorAll('.modal');

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
   adjustMenuPosition();
   return false;
}

function setTogglePosition() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  theToggle.style.top = (scrollTop > 20 ? (scrollTop + 20) : 20) + 'px';
}

function adjustMenuPosition() {
  var toggleRect = theToggle.getBoundingClientRect();
  theMenu.style.top = (toggleRect.bottom + 10) + 'px';
}

window.addEventListener('scroll', setTogglePosition);

document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('#menu li a');

    function closeModal() {
        modals.forEach(function (modal) {
            modal.style.display = 'none';
        });
    }

    menuLinks.forEach(function(link, index) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            closeModal();
            modals[index].style.display = 'block';
        });
    });

    var closeButtons = document.querySelectorAll('.btn-close');
    closeButtons.forEach(function (btn) {
        btn.addEventListener('click', closeModal);
    });

    modals.forEach(function (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
});


