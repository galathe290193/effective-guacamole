$(document).ready(function(){
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
        $('#' + id).val(value+" May, 2014");
   }); 
   
   $('#search').on('click', function(e){
       $('.booking').addClass('is-sent');
       e.preventDefault();
   });
   });	

   // Sélectionnez le bouton de recherche par son ID
const searchButton = document.getElementById('search');

// Ajoutez un écouteur d'événements pour le clic sur le bouton
searchButton.addEventListener('click', function() {
    // Affichez une alerte indiquant que le site est une démo
    alert("Ce site est une démo. Vous ne pouvez pas effectuer de réservation réelle.");
});