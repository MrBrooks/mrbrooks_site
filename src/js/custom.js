/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

$(document).ready(function() {

    /* Custom */

 /*    //= ./common/material-init.js */
 /*    //= ./common/google-analytics.js */
  $(".mbr-main-anim").height(window.innerHeight);
  $("#mbr-clients-slider").owlCarousel({
    loop: true,
    items: 4
  });

  function fixGridBug(padding){
    console.log($(".mbr-portfolio__first-block").height());
    $(".fix-height").height($(".mbr-portfolio__first-block").height() - 2*padding);
  }

  setTimeout(fixGridBug(10),5000);

});
