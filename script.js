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
  var y = -50; // Commencer depuis le haut du canvas
  var radius = Math.random() * 3 + 1; // Taille aléatoire pour la météorite
  var speed = Math.random() * 2 + 1; // Vitesse aléatoire pour la météorite
  var angle = Math.random() * Math.PI * 2; // Angle aléatoire pour la spirale
  
  // Ajouter la météorite au tableau
  meteors.push({ x: x, y: y, radius: radius, speed: speed, angle: angle });
}

// Créer une fonction pour dessiner les météorites
function drawMeteors() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dessiner chaque météorite dans le tableau
  meteors.forEach(function(meteor) {
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.radius, 0, Math.PI * 2);
    ctx.fillStyle = getRandomNeonColor(); // Couleur néon aléatoire pour la météorite
    ctx.fill();
    
    // Mettre à jour la position de la météorite pour la faire suivre une spirale
    meteor.x += Math.cos(meteor.angle) * meteor.speed;
    meteor.y += Math.sin(meteor.angle) * meteor.speed;
    meteor.angle += 0.05; // Augmenter l'angle pour simuler une spirale
    
    // Réinitialiser la position de la météorite une fois qu'elle sort du canvas
    if (meteor.x < -50 || meteor.x > canvas.width + 50 || meteor.y < -50 || meteor.y > canvas.height + 50) {
      var index = meteors.indexOf(meteor);
      meteors.splice(index, 1);
    }
  });
}

// Fonction pour générer une couleur néon aléatoire
function getRandomNeonColor() {
  var neonColors = ['#ff6eff', '#6effff', '#ff6eff']; // Rose, bleu et violet
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Créer une fonction pour animer les météorites
function animateMeteors() {
  // Appeler la fonction de dessin à chaque rafraîchissement de l'écran
  requestAnimationFrame(animateMeteors);
  
  // Générer une nouvelle météorite à intervalles réguliers
  if (Math.random() < 0.02) { // Réduire la fréquence d'apparition pour ralentir l'animation
    createMeteor();
  }
  
  // Dessiner les météorites
  drawMeteors();
}

// Démarrer l'animation
animateMeteors();