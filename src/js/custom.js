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
  function loadOptimVideo(selector){
    var vid = $(selector); 
    if(vid.length > 0){
      var width = $(window).width(),
          start = "<source src='",
          end = "' type='video/mp4; codecs='avc1.42E01E, mp4a.40.2''>",
          url;
      var urls = vid.attr("data-urls").split(",");

      console.log(urls);
      if(width < 1280){
        url = urls[0];
      } else if(width > 1920){
        url = urls[2];
      } else {
        url = urls[1];
      }
      
      vid.append(start+url+end);
      vid.get(0).load();
    }
  }
  loadOptimVideo("#mbr-video-main");

  function videoScrolling(keypoints, speed){
    var vid = document.getElementById("mbr-video-main");
    var jvid = $("#mbr-video-main");
    var currPoint = 0, playingFlag = false;
    // vid.load();
    // vid.pause();
    function extendKeypoints(){
      // console.log(keypoints[keypoints.length - 1]);
      // console.log(vid.duration);
      if(keypoints[keypoints.length - 1] != vid.duration){
        keypoints.push(vid.duration);
      }
      if(keypoints[0] >= 0){
        keypoints.unshift(0);
      }
    }

    function afterLoadingVideo(callback){
      var timer;
      timer = setInterval(function(){
        if (!isNaN(vid.duration)){
          clearTimeout(timer);
          if (callback && typeof(callback) === "function") {
            callback();
            // console.log(vid.duration);
          }
        }
      },50);
    }
    function playToPrevPoint(){
      currPoint = --currPoint > 0? currPoint: 0;
      vid.currentTime = keypoints[currPoint];
      // currTime = vid.currentTime;
      // if(vid.currentTime >= keypoints[currPoint]){
      //   var timer;
      //   timer = setInterval(function(){
      //     vid.currentTime -= 1/fps;
      //     // vid.play();
      //     // console.log("currentTime--");
      //     // vid.pause();
      //     if(vid.currentTime <= keypoints[currPoint] && vid.currentTime <= 0){
      //       clearTimeout(timer);
      //     }
      //   },Math.floor(1000/fps));
      // }
    }
    function playingStart(){
      $("#mbr-find-answer").fadeOut(400);
    }
    function playingEnd(){
      $("#mbr-find-answer").fadeIn(400);
    }
    function videoEnd(){
      currPoint = keypoints.length - 1;
      $("body").css("overflow", "auto");
      $("#mbr-video-main").fadeOut(100);
      $('html, body').animate({
        scrollTop: $(window).height()
      }, 1000,function(){
        // scrollEventControl();
      });
    }
    function videoStart(){
      $("body").css("overflow", "hidden");
      $("#mbr-video-main").fadeIn(100);
    }
    function goToKeypoint(index){
      vid.currentTime = keypoints[index];
      currPoint = index;
    }
    function playToNextPoint(){
      currPoint = ++currPoint < keypoints.length - 1 ? currPoint : keypoints.length - 1;
      if(vid.currentTime < keypoints[currPoint]){
        playingStart();
        vid.play();
        playingFlag = true;
        var timer;
        timer = setInterval(function(){
          if(vid.currentTime >= keypoints[currPoint]){
            vid.pause();
            playingFlag = false;
            playingEnd();
            if(currPoint === keypoints.length - 1){
              videoEnd();
            }
            // ++currPoint;
            clearTimeout(timer);
          }
        },50);
      }
    }
    $("#test-btn").click(videoEnd);
    // function setSectionHeight(h){
    //   $("#mbr-main-anim").height(h);
    // }
    function init(){
      afterLoadingVideo(function(){
        // setSectionHeight(vid.duration*speed);
        $("body").css("overflow","hidden");
        extendKeypoints();
        wheelEventControl();
        scrollEventControl();
      });
    }
    function scrollEventControl(){
      var timer;
      $(window).bind("scroll",function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
          if($("body").scrollTop() <= $(window).height()*2/3){
            $("body").css("overflow","hidden");
            $('html, body').animate({
              scrollTop: 0
            }, 500,function(){
              goToKeypoint(0);
              videoStart();
            });
          }
        },100);
      });
    }
    function wheelEventControl(){
      var timer, flag = true, e;
      // clearTimeout(timer);
      $(window).on("wheel mousewheel tap taphold", function(event){
        if (flag && !playingFlag){
          // console.log(event);
          if(event.originalEvent.deltaY === 0){
            // console.log("Zero delta")
            return 0;
          }
          if(event.originalEvent.deltaY > 0){
            console.log("Try scrolling...Next");
            playToNextPoint();
          } else{
            console.log("Try scrolling...Prev");
            playToPrevPoint();
          }
          flag = false;
          clearTimeout(timer);
          timer = setTimeout(function(){
            flag = true;
          },1000);
          // console.log("Try scrolling...");
        }
      });
    }
    init();
    // if(vid){
    //   // console.log(vid.duration);
    //   window.onscroll = function(){
    //     console.log("On scroll - "+ window.pageYOffset);
    //     // console.log(vid.duration);
    //     // vid.currentTime = window.pageYOffset/speed;
    //     return false;
    //   }
    // }
  }
  videoScrolling([5,10,20],200);
  function createProjectTimeline(){
    var sections = $("section[data-section-name]");
    if( sections.length > 0){
      var section_names = [],
          scroll_top_arr = [],
          timeline_list = $("#mbr-project__timeline>ul"),
          current_scroll = 0,
          current_section,
          resizeTimer,
          scrollTimer,
          flagAllowUpdate = true;
      sections.each(function(index, el){
        section_names.push($(this).attr("data-section-name"));
        scroll_top_arr.push($(this).offset().top);
      });
      
      function reinitSectionArray(){
        scroll_top_arr = [];
        sections.each(function(index, el){
          scroll_top_arr.push($(this).offset().top);
        });
      }

      function whatSection(){
        var i = 0;
        current_scroll = $("body").scrollTop();
        if(current_scroll < scroll_top_arr[0]){
          return -1;
        }
        while (current_scroll >= scroll_top_arr[i]){
          ++i;
        }
        return current_section = --i;
      }

      function goToSection(index){
        flagAllowUpdate = false;
        current_section = index;
        var scroll;
        if (index === -1){
          scroll = 0;
        } else{
          scroll = scroll_top_arr[index];
        }
        $('html, body').animate({
          scrollTop: scroll
        }, 500,function(){
          flagAllowUpdate = true;
          updateView();
        });
      }

      function goPrevSection(){
        goToSection(current_section - 1);
      }

      function goNextSection(){
        goToSection(current_section + 1);
      }

      function updateView(){
        if(flagAllowUpdate){
          if (current_section === -1){
            $("#mbr-project__timeline").fadeOut();
          }
          else{
            $("#mbr-project__timeline").fadeIn();
          }
          $("#mbr-project__timeline li[data-index='"+current_section+ "']").addClass("active").siblings().removeClass("active");
        }
      }

      //Generate html list
      for(var i = 0; i < sections.length; i++){
        timeline_list.append("<li data-index='"+i+"'>"+section_names[i]+"</li>");
      }

      //Events control
      $("#mbr-project__timeline li").on("click",function(){
        var index = $(this).attr("data-index");
        // $(this).addClass("active").siblings().removeClass("active");
        goToSection(index);
        updateView();
      });
      $("#mbr-project__timeline>.controls>.prev").on("click",function(){
        goPrevSection();
        updateView();
      });
      $("#mbr-project__timeline>.controls>.next").on("click",function(){
        goNextSection();
        updateView();
      });
      $(window).resize(function(){
        clearTimeout(resizeTimer);
        setTimeout(reinitSectionArray,200);
      });
      $(window).bind("scroll",function(){
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function(){
          current_scroll = $("body").scrollTop();
          current_section = whatSection();
          console.log(current_scroll);
          console.log(current_section);
          updateView();
        },50);
      });
      // setInterval(function(){
      //   // if(current_scroll != $("body").scrollTop()){
      //   //   console.log(current_scroll);
      //   // }
      //   current_scroll = $("body").scrollTop();

      //   current_section = whatSection(current_scroll); 
      //   updateView();
      // },400);
    }
  }
  createProjectTimeline();

  function PortfolioGrid(options){
    var opt = $.extend({
      magrin : 20,
      selectFirst : ".mbr-portfolio__first-block",
      selectCenter : ".mbr-portfolio__center-block",
      selectLeft : ".mbr-portfolio__left-block",
      selectRight : ".mbr-portfolio__right-block",
      selectItem: ".mbr-portfolio__item"
    },options);

    
  }

  function suffleLetters(opt){
    var def_opt = $.extend({
        selector: ".shuffleOnHover",
        events: "mouseenter",
        length: 10,
        duration: 700,
        iterations: 20,
        lang: "ru",
        mode: "seq", // seq or rand
        fixedWidth: false
      },opt);
    function randomString(len){
      len = typeof(len) != 'undefined'? len : def_opt.length;
      var pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?/(^)![]{}*&^%$#%";
      if(def_opt.lang == "ru"){
        pool = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789?/(^)![]{}*&^%$#%";
      }
      var arr = pool.split(''),
          result="";
      for(var i = 0; i < len;i++){
        result += arr[Math.floor(Math.random()*arr.length)];
      }
      return result;
    }
    function seqRandomString(content, index){ //index ~ 1,2,3,4,...
      // console.log(content.slice(0, index));
      // console.log(randomString(content.length - index));
      return content.slice(0, index) + randomString(content.length - index);
    }
    function Generator(){
      var pause = Math.round(def_opt.duration/def_opt.iterations),
          flag = true,count = 0,content;
      // $(opt.selector).each(function(index, elem){
      //   content = $(this).html();
      //   if(content.length != opt.length){
      //     console.log("Warning! Lengths don't match");
      //   }
      //   $(this).bind(opt.events,function(){
      //     for(var i = 0; i < opt.iterations;i++){
      //       setTimeout(function(){
      //         $(this).html(randomString());
      //       },i*pause);
      //     }
      //     setTimeout(function(){
      //       $(this).html(content);
      //     },opt.duration);
      //   });
      // });
      $(def_opt.selector).on(def_opt.events,function(){
        if(flag){
          flag = false;
          var elem = $(this),
              content = $(this).html();
          if(def_opt.fixedWidth){
            var width = $(this).parent().width();
            // $(this).parent().css("min-width",width+"px");
            $(this).parent().width(width);
          }

          if (def_opt.length != content.length){
            def_opt.length = content.length;
            console.log("Warning! Lengths don't match");
          }
          var iterator = 0;
          for(var i = 0; i < def_opt.iterations;i++){
            setTimeout(function(){
              if(def_opt.mode == "rand"){
                elem.html(randomString());
              } else if (def_opt.mode == "seq"){
                elem.html(seqRandomString(content,Math.floor((iterator++)*content.length/def_opt.iterations))); // доделать
              } else{
                console.log("suffleLetters error! Unknown mode!");
              }
            },i*pause);
          }
          setTimeout(function(){
            elem.html(content);
            flag = true;
          },def_opt.duration);
        }
      });
    }
    Generator();
  }
  suffleLetters();
  // ПОМЕНЯТЬ ПОТОМ!!!
  // $(".mbr-portfolio__item").wrap("<a href='project.html'>");
  $(".mbr-portfolio__item").addClass("withripple").attr("data-ripple-color", "#e1bb9a").ripples();
  $(".mbr-portfolio__item").hover(function(){
    $(this).find(".onhover").addClass("active");
  },function(){
    $(this).find(".onhover").removeClass("active");
  });

  var map = $("#mbr-map");
  map.height(map.width());
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
});

