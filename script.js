// Fonction pour créer ou mettre à jour le cookie de consentement
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Masquer le bandeau de cookie
function hideCookieBanner() {
    document.getElementById("cookie-banner").style.display = "none";
}

// Écouteurs d'événements pour les boutons d'acceptation et de refus des cookies
document.getElementById("accept-cookies").addEventListener("click", function() {
    setCookie("cookie_consent", true, 365); // Stocke le consentement pendant 1 an
    hideCookieBanner();
});

document.getElementById("reject-cookies").addEventListener("click", function() {
    setCookie("cookie_consent", false, 365); // Stocke le refus de consentement pendant 1 an
    hideCookieBanner();
});

// Vérifie si le cookie de consentement existe déjà
if (document.cookie.indexOf("cookie_consent=true") !== -1) {
    hideCookieBanner(); // Masquer le bandeau de cookie si l'utilisateur a déjà accepté les cookies
}

// Récupérer le canvas et son contexte
var canvas = document.getElementById('background-canvas');
var ctx = canvas.getContext('2d');

// Définir la taille du canvas en fonction de la taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dessiner quelque chose sur le canvas (par exemple, un dégradé de couleur)
var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);