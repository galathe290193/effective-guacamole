$(document).ready(function(){
    let panierCount = 0;

    // Mettre à jour le compteur du panier
    function updatePanierCount() {
        $("#panier-count").text(panierCount);
    }

    // Ajouter un don au panier
    $(".bouton").click(function(){
        panierCount++;
        updatePanierCount();
        alert("Don ajouté au panier !");
    });

    // Effet de hover sur les boutons
    $(".bouton").hover(
        function(){
            $(this).css("background-color", "#0056b3");
        },
        function(){
            $(this).css("background-color", "#007BFF");
        }
    );

    // Effet de hover sur les cartes
    $(".carte").hover(
        function(){
            $(this).css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0.2)");
        },
        function(){
            $(this).css("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.1)");
        }
    );

    // Exemple de gestion du clic sur le panier (ouverture/fermeture d'un panier réel)
    $("#panier-icon").click(function(){
        alert("Ouverture du panier !");
        // Ici, vous pouvez ajouter le code pour ouvrir/fermer un panier réel
    });
});