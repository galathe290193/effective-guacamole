function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour obtenir un cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Fonction pour supprimer un cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Fonction d'initialisation
function init() {
    // Événement pour définir un cookie lorsque le bouton est cliqué
    document.getElementById("setCookieBtn").addEventListener("click", function () {
        setCookie("exempleCookie", "valeurDuCookie", 7); // Définit le cookie pendant 7 jours
        alert("Cookie défini avec succès !");
    });

    // Événement pour obtenir un cookie lorsque le bouton est cliqué
    document.getElementById("getCookieBtn").addEventListener("click", function () {
        var cookieValue = getCookie("exempleCookie");
        if (cookieValue) {
            alert("Valeur du cookie : " + cookieValue);
        } else {
            alert("Aucun cookie trouvé !");
        }
    });

    // Événement pour supprimer un cookie lorsque le bouton est cliqué
    document.getElementById("deleteCookieBtn").addEventListener("click", function () {
        deleteCookie("exempleCookie");
        alert("Cookie supprimé avec succès !");
    });
}

// Appel de la fonction d'initialisation une fois que le DOM est chargé
document.addEventListener("DOMContentLoaded", init);