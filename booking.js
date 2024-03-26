$(document).ready(function(){
    // Fonction pour afficher l'alerte
    function showAlert() {
        alert("Ce site est une démo, vous ne pouvez pas effectuer de réservation réelle !");
    }

    $('.pop-up').on('click', function(){
        $('#overlay').fadeIn(300); 
        $('.calendar').fadeIn(300); 
        let clickedbutton = $("input",$(this).parent()).attr('id');
        $('.dates').data('type',clickedbutton);
    });
    
    $('table').on('click', function(event){
        let that=$(event.target);
        if(that.is('td') && !that.hasClass('notCurMonth') && !that.hasClass('holiday') && !that.hasClass('curDay')){
            $('td.curDay').toggleClass('curDay');
            that.toggleClass('curDay');
        }
    }); 
    
    $('#add_event').on('click', function(){
        let value= $('td.curDay').html();
        $('#overlay').fadeOut(300);
        $('.calendar').fadeOut(300);
        let id=($('.dates').data()).type;
        $('#' + id).val(value+" May, 2024");
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
document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.querySelector('.dates');
    const closeIcon = document.querySelector('.close-icon');
    
    // Fermer le calendrier en cliquant sur la croix
    closeIcon.addEventListener('click', function() {
        calendar.setAttribute('data-type', 'none');
    });

    // Fermer le calendrier en cliquant en dehors du cadre
    document.addEventListener('click', function(event) {
        if (!calendar.contains(event.target) && event.target !== closeIcon) {
            calendar.setAttribute('data-type', 'none');
        }
    });
});
