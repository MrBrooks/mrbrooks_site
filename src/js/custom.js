/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

$(document).ready(function() {

    /* Custom */

 /*    //= ./common/material-init.js */
 /*    //= ./common/google-analytics.js */
  // $(".mbr-main-anim").height(window.innerHeight);
  $("#mbr-clients-slider").owlCarousel({
    loop: true,
    items: 4,
    autoplay: true,
    autoplayTimeout: 1000,
    dots: false,
    nav: false
  });
  $(".mbr-project-slider").owlCarousel({
    loop: true,
    items: 1,
    // autoplay: true,
    // autoplayTimeout: 3000,
    dots: false,
    nav: true,
    navText: [" ", " "]
  });
  function createProjectTimeline(){
    var sections = $("section[data-section-name]");
    if( sections.length > 0){
      var section_names = [], scroll_top_arr = [];
      sections.each(function(index, el){
        section_names.push(el.attr("data-section-name"));
        scroll_top_arr.push(el.scrollTop());
      });
      console.log(scroll_top_arr);
      console.log(section_names);
    }
  }
  createProjectTimeline();
  // ПОМЕНЯТЬ ПОТОМ!!!
  $(".mbr-portfolio__item").wrap("<a href='project.html'>");

  var map = $("#mbr-map");
  map.height(map.width());
});

//GOOLGE MAP INITIALIZATION
if($("#mbr-map").length > 0){
  var map;
  function initMap() {
    var customMapType = new google.maps.StyledMapType([
        {
          stylers: [
            {saturation: -100}
          ]
        }
      ], {
        name: 'Custom Style'
    });
    var customMapTypeId = 'custom_style';
    map = new google.maps.Map(document.getElementById('mbr-map'), {
      center: {lat: 59.945145, lng: 30.292703},
      zoom: 18,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    });
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
    setMarker(map);
  }

  function setMarker(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
      url: 'img/svg/marker.svg',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(80, 100),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(40, 100)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var marker = new google.maps.Marker({
        position: {lat: 59.945145, lng: 30.292703},
        map: map,
        icon: image,
        // shape: shape,
        title: "Mr.Brooks",
        zIndex: 1
      });
  }
}