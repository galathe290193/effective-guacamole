$(document).ready(function(){
    // Fonction pour afficher l'alerte
    function showAlert() {
        alert("Ce site est une démo, vous ne pouvez pas effectuer de réservation réelle !");
    }

    $('.pop-up').on('click', function(){
        $('#overlay').fadeIn(300); 
        $('.calendar').fadeIn(300); 
        let clickedbutton = $(this).prev().attr('id'); // Récupérer l'ID de l'input précédent
        $('.dates').data('type', clickedbutton);
    });
    
    $('table').on('click', function(event){
        let that=$(event.target);
        if(that.is('td') && !that.hasClass('notCurMonth') && !that.hasClass('holiday') && !that.hasClass('curDay')){
            $('td.curDay').removeClass('curDay'); // Supprimer la classe curDay de l'ancien jour sélectionné
            that.addClass('curDay'); // Ajouter la classe curDay au jour sélectionné
        }
    }); 
    
    $('#add_event').on('click', function(){
        let value = $('td.curDay').html();
        $('#overlay, .calendar').fadeOut(300); // Masquer l'overlay et le calendrier
        let id = $('.dates').data('type');
        $('#' + id).val(value + " May, 2014");
    }); 
    
    // Au clic sur le bouton "Search rooms"
    $('#search').on('click', function(e){
        $('.booking').addClass('is-sent');
        showAlert(); // Afficher l'alerte
        e.preventDefault();
    });

    // Détecter la fin de l'animation et afficher le bouton "Back to Home"
    $('.booking').on('animationend', function() {
        $('#book-now').show();
    });

    // Au clic sur le bouton "Back to Home"
    $('#book-now').on('click', function(){
        // Rediriger vers la page d'accueil
        window.location.href = "index.html";
    });
});