var canvas = document.getElementById('background-canvas');
var ctx = canvas.getContext('2d');

// Définir la taille du canvas en fonction de la taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Créer un tableau pour stocker les météorites
var meteors = [];

// Créer une fonction pour générer une météorite
function createMeteor() {
  // Générer des coordonnées aléatoires pour la météorite
  var side = Math.floor(Math.random() * 4); // Déterminer si la météorite apparaît sur le haut, le bas, la gauche ou la droite
  var x, y;
  
  if (side === 0) { // Haut
    x = Math.random() * canvas.width;
    y = -50;
  } else if (side === 1) { // Bas
    x = Math.random() * canvas.width;
    y = canvas.height + 50;
  } else if (side === 2) { // Gauche
    x = -50;
    y = Math.random() * canvas.height;
  } else { // Droite
    x = canvas.width + 50;
    y = Math.random() * canvas.height;
  }
  
  var radius = Math.random() * 3 + 1; // Taille aléatoire pour la météorite
  var speed = Math.random() * 2 + 1; // Vitesse aléatoire pour la météorite
  
  // Ajouter la météorite au tableau
  meteors.push({ x: x, y: y, radius: radius, speed: speed });
}

// Créer une fonction pour dessiner les météorites
function drawMeteors() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dessiner chaque météorite dans le tableau
  meteors.forEach(function(meteor) {
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; // Couleur blanche pour la météorite
    ctx.fill();
    
    // Mettre à jour la position de la météorite pour la faire descendre ou monter
    if (meteor.x < canvas.width / 2) {
      meteor.x += meteor.speed;
    } else {
      meteor.x -= meteor.speed;
    }
    
    if (meteor.y < canvas.height / 2) {
      meteor.y += meteor.speed;
    } else {
      meteor.y -= meteor.speed;
    }
    
    // Réinitialiser la position de la météorite une fois qu'elle atteint le bas du canvas
    if (meteor.x < -50 || meteor.x > canvas.width + 50 || meteor.y < -50 || meteor.y > canvas.height + 50) {
      var index = meteors.indexOf(meteor);
      meteors.splice(index, 1);
    }
  });
}

// Créer une fonction pour animer les météorites
function animateMeteors() {
  // Appeler la fonction de dessin à chaque rafraîchissement de l'écran
  requestAnimationFrame(animateMeteors);
  
  // Générer une nouvelle météorite à intervalles réguliers
  if (Math.random() < 0.05) {
    createMeteor();
  }
  
  // Dessiner les météorites
  drawMeteors();
}

// Démarrer l'animation
animateMeteors();