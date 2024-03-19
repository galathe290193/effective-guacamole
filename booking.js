$(document).ready(function(){
    // Cette fonction est déclenchée lorsque le document est prêt
    $('.pop-up').on('click', function(){
        // Cette fonction est déclenchée lorsque l'utilisateur clique sur l'icône de calendrier
        $('#overlay').fadeIn(300); 
        $('.calendar').fadeIn(300); 
        let clickedbutton = $("input",$(this).parent()).attr('id');
        $('.dates').data('type',clickedbutton);
    });
    
    $('table').on('click', function(event){
      let that=$(event.target);
       if(that.is('td') && !that.hasClass('notCurMonth') && !that.hasClass('holiday') && !that.hasClass('curDay')){
           // Cette fonction est déclenchée lorsque l'utilisateur clique sur une cellule du calendrier
           $('td.curDay').toggleClass('curDay');
           that.toggleClass('curDay');
       }
   }); 
   
   $('#add_event').on('click', function(){
       // Cette fonction est déclenchée lorsque l'utilisateur clique sur le bouton "Add event"
       let value= $('td.curDay').html();
       $('#overlay').fadeOut(300);
        $('.calendar').fadeOut(300);
        let id=($('.dates').data()).type;
        $('#' + id).val(value+" May, 2014");
   }); 
   
   $('#search').on('click', function(e){
       // Cette fonction est déclenchée lorsque l'utilisateur clique sur le bouton "Search rooms"
       $('.booking').addClass('is-sent');
       e.preventDefault();
       // Afficher une alerte indiquant que le site est une démo
       alert("Ce site est une démo. Vous ne pouvez pas effectuer de réservation réelle.");
   });
});