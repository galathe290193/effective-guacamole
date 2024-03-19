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
  var x = Math.random() * canvas.width;
  var y = -50; // La météorite commence en haut du canvas
  var radius = Math.random() * 3 + 1; // Taille aléatoire pour la météorite
  
  // Générer une vitesse de chute aléatoire pour la météorite
  var speed = Math.random() * 2 + 1;
  
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
    
    // Mettre à jour la position de la météorite pour la faire descendre
    meteor.y += meteor.speed;
    
    // Ajuster la position horizontale en fonction de la position verticale et d'une composante circulaire
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var distanceToCenter = Math.sqrt(Math.pow(meteor.x - centerX, 2) + Math.pow(meteor.y - centerY, 2));
    var angle = Math.atan2(centerY - meteor.y, centerX - meteor.x);
    var circularMotion = 0.1; // Ajustez cette valeur pour changer l'intensité de la composante circulaire
    
    meteor.x += Math.cos(angle) * circularMotion * distanceToCenter;
    
    // Réinitialiser la position de la météorite une fois qu'elle atteint le bas du canvas
    if (meteor.y > canvas.height + meteor.radius) {
      meteor.y = -meteor.radius; // Repositionner la météorite en haut du canvas
      meteor.x = Math.random() * canvas.width; // Repositionner la météorite horizontalement de manière aléatoire
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