// Fonction pour créer ou mettre à jour le cookie de visite
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour récupérer la valeur d'un cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Fonction pour supprimer un cookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Fonction pour incrémenter le compteur de visites
function incrementVisitCounter() {
    var visits = parseInt(getCookie("visits")) || 0;
    visits++;
    setCookie("visits", visits, 365); // Stocke le nombre de visites pendant 1 an
    document.getElementById("visits").textContent = visits;
}

// Masquer le bandeau de cookie
function hideCookieBanner() {
    document.getElementById("cookie-banner").style.display = "none";
}

// Vérifie si le cookie de consentement existe déjà
if (!getCookie("cookie_consent")) {
    // Affiche le bandeau de cookie
    document.getElementById("cookie-banner").style.display = "block";

    // Écouteur d'événement pour le clic sur le bouton d'acceptation des cookies
    document.getElementById("accept-cookies").addEventListener("click", function() {
        setCookie("cookie_consent", true, 365); // Stocke le consentement pendant 1 an
        hideCookieBanner();
        incrementVisitCounter();
    });

    // Écouteur d'événement pour le clic sur le bouton de refus des cookies
    document.getElementById("reject-cookies").addEventListener("click", function() {
        deleteCookie("cookie_consent"); // Supprime le cookie de consentement
        hideCookieBanner();
    });
} else {
    // Si l'utilisateur a déjà accepté les cookies, masquer le bandeau de cookie
    hideCookieBanner();
    // Si l'utilisateur a accepté les cookies, incrémenter le compteur de visites
    incrementVisitCounter();
}