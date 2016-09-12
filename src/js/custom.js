/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/
function Loader(callback){
  var preloader = $("#mbr-prealader"),
      imitationTimer,
      imitation = 0,
      self = this,
      progressbar = Snap("svg#progress #progressbar");

  if(getCookie('preloaderShowen')){
    // src = "/sites/all/themes/mrbrooks"; // in html by default
  } else{
    setCookie('preloaderShowen',1);
    preloader.find("img").attr("src","/sites/all/themes/mrbrooks/img/images/loader.gif");
  }
  // var gifloader = $("#gifloader");
  // var gifsrc = gifloader.attr("src");
  //     gifloader.attr("src", "");
  // setTimeout(function(){
  //   gifloader.show();
  //   gifloader.attr("src", gifsrc);
  // },100);
  
  function hide(){
    $("body").css("overflow","auto");
    preloader.addClass("preloader-hide");
  }
  
  self.preloaderHide = function (){
    // console.log("In preloaderHide");
    clearInterval(imitationTimer);
    imitationTimer = setInterval(imitationProgress,20);
  };

  function imitationProgress(){
    if(progressbar.attr("width") < 144){
      progressbar.attr("width",imitation += Math.ceil(Math.random()*4));
    } else{
      clearInterval(imitationTimer);
      progressbar.attr("width",144);
      hide();
      // console.log( typeof(callback));
      if (typeof(callback) === "function"){
        callback();
      }
      
    }
    
  }

  self.init = function(){
    preloader.height($(window).height());
    preloader.width($(window).width());
    progressbar.attr("width",0);
    imitationTimer = setInterval(imitationProgress, 750);
  };

}

function updateArticle(){
  var article_wrapper = $("#mbr-article-content-wrap");
  var content = $("#mbr-article-content-wrap>.mbr-article__content");
  var target = $("#mbr-article-content-target");
  var self = this;

  function setLarge(){
    content.appendTo(target);
  }
  function setNormal(){
    content.appendTo(article_wrapper);
  }

  self.update = function (){
    if( $(window).width() >= 1600){
      setLarge();
    } else{
      setNormal();
    }
  };
}

function vimeo(){
  var videos = $(".mbr-vimeo-play");
  // var ids = [];
  // videos.each(function(){
  //   ids.push($(this).attr('data-video-id'));
  //   $(this).attr('id',$(this).attr('data-vimeo-id'));
  // });
  // var vimeo_players = [];
  // for(var i = 0; i < ids.length; i++){
  //   vimeo_players.push(new Vimeo.Player('video-'+ids[i]));
  // }
  // this.players = vimeo_players;
  videos.on('click',function(){
    var sibl = $(this).siblings();
    var w = sibl.width();
    sibl.css({
      'opacity': 0,
      // 'position': 'absolute',
      'z-index': -1,
      'width': w
    });
    var id = $(this).hide().attr('data-video-id');
    var parent = $(this).parent();
    var width = parent.width();
    parent.append($('<div class="video-wrapper" id="video-'+id+'"></div>'));
    var player = new Vimeo.Player('video-'+id,{
      id: id,
      width: w
    });
    player.play();
  });
}

function updateFullhieght(){
  var items = $(".fullheight");
  this.update = function(){
    items.css('height',$(window).height() - 70);
  };
}
function windowUpdater(func_arr){
  var self = this, timer;

  function update(){
    for(var i = 0; i < func_arr.length; i++){
      func_arr[i]();
    }
  }


  function init(){
    $(window).on('resize',function(){
      clearTimeout(timer);
      timer = setTimeout(function(){
        update();
      },200);
    });
    $(window).trigger('resize');
  }
  init();
}

$(window).on("load",function(){
  loader.preloaderHide();
});
// $(window).load(function(){
//   var preloader = $("#preloader");
//   preloader.animate({opacity : 0}, 1000,function(){
//     $('html, body').removeClass('lock');
//     preloader.hide();
//   });
// });
var update_article, loader, update_fullhieght;

$(document).ready(function() {
  // update_article = new updateArticle(); //MBR DELETE
  update_fullhieght = new updateFullhieght();
  // var updater = new windowUpdater([update_article.update, update_fullhieght.update]);
  var updater = new windowUpdater([update_fullhieght.update]);
  
  loader = new Loader(); //MBR DELETE
  loader.init();

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
  
  var vimeos = new vimeo();

  $(".mbr-portfolio").galleryGrid({
    margin: 10,
    // selectGallery: ".gallery",
    selectFirst: ".mbr-portfolio__first-block",
    selectLeft: ".mbr-portfolio__left-block",
    selectCenter: ".mbr-portfolio__center-block",
    selectRight: ".mbr-portfolio__right-block",
    selectItem: ".mbr-portfolio__item",
    selectFilterList: "#mbr-filter-list",
    addGalleryMargin: false,
    callback: function(){
      // console.log("in callback");
      // console.log(this);
      // console.log(self);
      // if($(window).width() < this.mobileStarts)
      // $(".mbr-portfolio").find(this.selectItem).css({
      //   "width" : "",
      //   "height": ""
      // });
    }
  });



  // if(window.innerWidth < 768){
    $("#mbr-main-anim").height(window.innerHeight - 70);
  // }

  // function portfolioFilter(){
  //   var filterList = $("#mbr-filter-list");
  //   $("#mbr-filter,#mbr-filter-accept").on("click", function(){
  //     filterList.slideToggle(200);
  //   });
  //   filterList.find("li").on("click",function(){
  //     $(this).toggleClass("active");
  //   });
  // }
  // portfolioFilter();
  function evalTrueColNumber(widths){ // [320, 768, 1024, 1600]
    var w = window.innerWidth, n = 0;
    while( w >= widths[n++] ){
    }
    return n;
  }

  if($("#column-grid").length > 0){
    var grid, timer,  ncol = evalTrueColNumber([767, 768, 1600]);

    // grid = $("#column-grid").columnGrid({n : 4, selectItem : ".mbr-blog__post"});
    grid = $("#column-grid").columnGrid({n : ncol, selectItem : ".mbr-blog__post"});

    $(window).on("resize", function(){
      clearTimeout(timer);
      timer = setTimeout(function(){
        grid.reload({n : evalTrueColNumber([768, 1024, 1600])});
      }, 1000);
    });
  }

  var onActionFlag = true;
  $("#mobile-menu-btn").on("click",function(){
    if (onActionFlag){
      onActionFlag = false;
      $(".mbr-header").toggleClass("active");
      setTimeout(function(){onActionFlag = true;},500);
    }
  });

  function loadOptimVideo(selector){
    var vid = $(selector); 
    if(vid.length > 0){
      var width = $(window).width(),
          start = "<source src='",
          end = "' type='video/mp4; codecs='avc1.42E01E, mp4a.40.2''>",
          url;
      var urls = vid.attr("data-urls").split(",");

      // console.log(urls);
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
  
  function fullscreenVideo(selector){
    loadOptimVideo(selector);
    var vid = $(selector);
    var jvid = vid.get(0);
    $("#mbr-play>svg").on("click",function(){
      if (jvid.requestFullscreen) {
        jvid.requestFullscreen();
      } else if (jvid.msRequestFullscreen) {
        jvid.msRequestFullscreen();
      } else if (jvid.mozRequestFullScreen) {
        jvid.mozRequestFullScreen();
      } else if (jvid.webkitRequestFullscreen) {
        jvid.webkitRequestFullscreen();
      }
      jvid.play();
    });
    if(jvid){
      jvid.onended = function(){
        if (document.exitFullscreen) {
          document.exitFullscreen(); 
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      };
    }
  }
  fullscreenVideo("#mbr-video-main");

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
      vid.pause();
      $("body").css("overflow", "auto");
      jvid.fadeOut(100);
      $('html, body').animate({
        scrollTop: $(window).height()
      }, 1000,function(){
        // scrollEventControl();
      });
    }
    function videoStart(){
      $("body").css("overflow", "hidden");
      jvid.fadeIn(100);
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
    // $("#down-btn").click(videoEnd);
    $("#down-btn").click(function(){
      $('html, body').animate({
        scrollTop: $(window).height()
      }, 1000);
    });
    // function setSectionHeight(h){
    //   $("#mbr-main-anim").height(h);
    // }
    function init(){
      if( $(window).width() > 768){
        afterLoadingVideo(function(){
          // setSectionHeight(vid.duration*speed);
          // $("body").css("overflow","hidden");
          // extendKeypoints();
          // wheelEventControl();
          // scrollEventControl();
        });
      }
    }
    function scrollEventControl(){
      var timer;
      if($("body").scrollTop() > 5){
        $("body").css("overflow","auto");
        $("#mbr-video-main").hide();
      }
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
            // console.log("Try scrolling...Next");
            playToNextPoint();
          } else{
            // console.log("Try scrolling...Prev");
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
  if ($("#mbr-video-main").length > 0){
    videoScrolling([5,10,20],200);
  }
  function createProjectTimeline(){

    var sections = $("section[data-section-name]");
    if( sections.length > 0){
      var section_names = [],
          scroll_top_arr = [],
          footer_top,
          timeline_list = $("#mbr-project__timeline>ul"),
          current_scroll = 0,
          current_section,
          resizeTimer,
          scrollTimer,
          flagAllowUpdate = true,
          direction = 0,
          afterScrollreinit = true;

      sections.each(function(index, el){
        section_names.push($(this).attr("data-section-name"));
        scroll_top_arr.push($(this).offset().top);
      });
      footer_top = $("footer").offset().top;
      
      function reinitSectionArray(){
        scroll_top_arr = [];
        sections.each(function(index, el){
          scroll_top_arr.push($(this).offset().top);
        });
        footer_top = $("footer").offset().top;
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
        $('html, body').css('overflow','hidden').animate({
          scrollTop: scroll
        }, 500,function(){
          flagAllowUpdate = true;
          updateView();
          $('html, body').css('overflow','auto');
        });
      }
      function sectionKeeper(){
        if( direction > 0 && (current_scroll > scroll_top_arr[current_section+1] - 400)){
          goNextSection();
        }
      }

      function goPrevSection(){
        goToSection(current_section - 1);
      }

      function goNextSection(){
        goToSection(current_section + 1);
      }

      function updateView(){
        if(flagAllowUpdate){
          if ((current_section === -1) || (current_scroll + $(window).height() > footer_top )){
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
          if(afterScrollreinit){reinitSectionArray();}
          direction = $("body").scrollTop() - current_scroll;
          current_scroll = $("body").scrollTop();
          current_section = whatSection();
          // console.log(current_scroll);
          // console.log(current_section);
          sectionKeeper();
          updateView();
        },200);
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
  if(window.innerWidth > 767){
    createProjectTimeline();
  }

  // function PortfolioGrid(options){
  //   var opt = $.extend({
  //     magrin : 20,
  //     selectFirst : ".mbr-portfolio__first-block",
  //     selectCenter : ".mbr-portfolio__center-block",
  //     selectLeft : ".mbr-portfolio__left-block",
  //     selectRight : ".mbr-portfolio__right-block",
  //     selectItem: ".mbr-portfolio__item"
  //   },options);

    
  // }

  $('.ajax-submit').submit(function(){
    var form = $(this), error = false;
    var btn = form.find('[type="submit"]'),
        action = form.attr("data-submit-url");

    

    form.find('input, textarea').each( function(){
      if ($(this).val() === '') {
        $(this).addClass("invalid");
        error = true;
      }
      else{
        $(this).removeClass("invalid");
      }
    });
    if (!error){
      btn.attr('disabled', 'disabled');
      var data = form.serialize();
      $.ajax({
         type: 'POST',
         url: action,
         dataType: 'json',
         data: data, 
           beforeSend: function(data) { 
              btn.text("Идет отправка...");
            },
           success: function(data){ 
            if (data['error']) { 
              btn.text("Ошибка");
              btn.prop('disabled', false);
            } else {
              btn.text("Отправлено");
              btn.prop('disabled', false);
            }
           },
           error: function (xhr, ajaxOptions, thrownError) {
            btn.val("Ошибка");
            btn.prop('disabled', false);
            alert(xhr.status); 
            alert(xhr.responseText);
            alert(thrownError);
           },
           complete: function(data) {
            btn.prop('disabled', false);
           }
           });
    }
    return false;
  });

  function suffleLetters(opt){
    var def_opt = $.extend({
        selector: ".shuffleOnHover",
        events: "mouseenter",
        length: 10,
        duration: 700,
        iterations: 20,
        lang: "ru",
        mode: "seq", // seq or rand
        fixedWidth: true,
        gameShuffle : false
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
      if(opt.gameShuffle){
        var elements = $(def_opt.selector), words = [],width, content = [];
        elements.each(function(index, el){
          // width = $(this).width();
          // $(this).width(width);
          words.push($(this).html().split(""));
          content.push($(this).html());
        });
        elements.each(function(index){
          var nothoverFlag = true;
          var rand = randomString(words[index].length);
          
          if( $(window).width() > 1024){
            $(this).html("");
            for(var i = 0; i < words[index].length; i++){
              $(this).append("<div class='inline' data-index='"+i+"'>"+rand[i]+"</div>");
            }
            $(this).children().one("mouseenter",function(){
              // if( nothoverFlag ){
              var iterator = 0, ind = parseInt($(this).attr("data-index")), self = $(this);
              // nothoverFlag = false;
              for(var i = 0; i < def_opt.iterations;i++){
                setTimeout(function(){
                  self.html(randomString(1));
                },i*pause);
              }
              setTimeout(function(){
                self.html(words[index][ind]);
              },i*pause);
              // }
            });
          } else {
            $(this).html(rand);
            $(this).one("touchstart",function(){
              var iterator = 0, self = $(this);

              for(var i = 0; i < def_opt.iterations;i++){
                setTimeout(function(){
                  self.html(randomString(words[index].length));
                },i*pause);
              }
              setTimeout(function(){
                self.html(content[index]);
              },i*pause);
            });
          }
        });
        // console.log(words);
      } else{
        $(def_opt.selector).on(def_opt.events,function(){
          if(flag){
            flag = false;
            var elem = $(this),
                content = $(this).html();
            if(def_opt.fixedWidth){
              var width = $(this).parent().width(),  height = $(this).parent().height();
              // $(this).parent().css("min-width",width+"px");
              $(this).parent().width(width).height(height);
            }

            if (def_opt.length != content.length){
              def_opt.length = content.length;
              // console.log("Warning! Lengths don't match");
            }
            var iterator = 0;
            for(var i = 0; i < def_opt.iterations;i++){
              setTimeout(function(){
                if(def_opt.mode == "rand"){
                  elem.html(randomString());
                } else if (def_opt.mode == "seq"){
                  elem.html(seqRandomString(content,Math.floor((iterator++)*content.length/def_opt.iterations)));
                } else {
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
    }
    Generator();
  }
  // suffleLetters();
  if( window.innerWidth >= 768){
    suffleLetters({selector: ".mbr-btn:not(.noshuffle), .shuffleOnHover"});
  }
  // suffleLetters({selector: ".shuffle>div", gameShuffle : true, lang: "en"});
  // ПОМЕНЯТЬ ПОТОМ!!!
  // $(".mbr-portfolio__item").wrap("<a href='project.html'>");
  $(".mbr-portfolio__item").addClass("withripple").attr("data-ripple-color", "#e1bb9a").ripples();
  $(".mbr-portfolio__item").hover(function(){
    $(this).find(".onhover").addClass("active");
  },function(){
    $(this).find(".onhover").removeClass("active");
  });

  var jmap = $("#mbr-map");
  jmap.height($(".mbr-contacts__form").height());
});
  //GOOLGE MAP INITIALIZATION
  // if(jmap.length > 0){
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
        center: {lat: 59.922290, lng: 30.251070},
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
        url: '/sites/all/themes/mrbrooks/img/svg/marker.svg',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(100, 100),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(50, 100)
      };
      // Shapes define the clickable region of the icon. The type defines an HTML
      // <area> element 'poly' which traces out a polygon as a series of X,Y points.
      // The final coordinate closes the poly by connecting to the first coordinate.
      var marker = new google.maps.Marker({
          position: {lat: 59.922290, lng: 30.251070},
          map: map,
          icon: image,
          // shape: shape,
          title: "Mr.Brooks",
          zIndex: 1,
          optimized: false
        });
    }
  // }
// });

/*YANDEX METRIKA*/
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter23922124 = new Ya.Metrika({
                id:23922124,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");