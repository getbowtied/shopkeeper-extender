jQuery(function(t){"use strict";t(window).on("load",function(){t(".gbt_18_sk_slider").length&&t(".gbt_18_sk_slider").each(function(){var e=Math.round((new Date).getTime()+100*Math.random());t(this).addClass("swiper-"+e);var i=t(this).attr("data-autoplay");!isNaN(parseFloat(i))&&isFinite(i)?i*=1e3:i=1e4;new Swiper(".swiper-"+e,{direction:"horizontal",loop:!0,grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,autoplay:{delay:i},speed:600,effect:"slide",parallax:!0,pagination:{el:".swiper-"+e+" .gbt_18_sk_slider_pagination",type:"bullets",clickable:!0},navigation:{nextEl:".swiper-"+e+" .swiper-button-next",prevEl:".swiper-"+e+" .swiper-button-prev"}})})})}),jQuery(function(t){"use strict";t(".main-navigation ul li.with-hover-image").each(function(){var e=t(this),i=t(this).find(".menu-item-hover-image");i.length&&(e.on("mouseenter",function(e){i.css({opacity:"1",visibility:"visible"})}),e.on("mouseleave",function(e){i.css({opacity:"0",visibility:"hidden"})}))})}),jQuery(function(i){"use strict";i(".from-the-blog").length&&i(".from-the-blog.swiper-container").each(function(){var e=i(this).attr("data-id");new Swiper(".swiper-"+e,{slidesPerView:1,loop:!0,breakpoints:{1024:{slidesPerView:3},640:{slidesPerView:2},480:{slidesPerView:1}},pagination:{el:".swiper-"+e+" .swiper-pagination"}})})}),jQuery(function(t){"use strict";t(window).on("load",function(){t(".shortcode_getbowtied_slider").length&&t(".shortcode_getbowtied_slider").each(function(){var e=t(this).attr("data-autoplay");!isNaN(parseFloat(e))&&isFinite(e)?e*=1e3:e=1e4;var i=t(this).attr("data-id");new Swiper(".swiper-"+i,{direction:"horizontal",loop:!0,grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,autoplay:{delay:e},speed:600,effect:"slide",parallax:!0,pagination:{el:".swiper-"+i+" .shortcode-slider-pagination",type:"bullets",clickable:!0},navigation:{nextEl:".swiper-"+i+" .swiper-button-next",prevEl:".swiper-"+i+" .swiper-button-prev"}})})})});