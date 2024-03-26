import 'feather-icons/dist/feather.min.css';
$(document).ready(function(){
    $(".home-button img").hover(
      function() {
        $(this).css("transform", "scale(1.1)");
      },
      function() {
        $(this).css("transform", "scale(1)");
      }
    );
  });