"use strict";

// import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
// import JSCCommon from "./JSCCommon.js";

function eventHandler() {
	// const $ = jQuery;
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".breadcrumb-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

	const swiper4 = new Swiper(".sBanners__slider--js", {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: "auto",
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});

	let prodCardThumb = new Swiper(".sProdCard-thumb-js", {
		slidesPerView: "auto",
		spaceBetween: 0,
	});
	let prodCardSlider = new Swiper(".sProdCard-slider-js", {
		slidesPerView: "auto",
		spaceBetween: 10,
		thumbs: {
			swiper: prodCardThumb,
		},
		breakpoints: {
      992: {
        slidesPerView: 1,
      }
    }
	});

  const cardsFlip = document.querySelectorAll('.item-nomin--js')
  if (cardsFlip.length) {
    cardsFlip.forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('active'))
    })
  }

  
	new Swiper(".auto-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});
  
	new Swiper(".sFrameSlider__slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
    speed: 600,
    parallax: true,
    breakpoints: {
      
    }

    // on: {
    //   reachEnd: function () {
    //     this.slideTo(0);
    //   },
    // },
	});

  $('.filter-btn-js').click(function () {
    $(this).toggleClass('active');
    $('.sidebar--js').slideToggle(function () {
      $(this).toggleClass('active');
    });
  });

  $(".btn-toggle-type-input").click(function(){
    let icon = $(this).find("svg.icon use")
    let iconId = $(this).find("svg.icon use").attr("xlink:href").split("#")[1];


    const opt = {
      'eye-off':  ['eye','password'],
      'eye':  ['eye-off','text'],
    }
    $(this).parent().find("input").attr("type", opt[iconId][1]);
    icon.attr("xlink:href",`img/svg/sprite.svg#${opt[iconId][0]}`)
  })


  /* hide btn after scroll main page */
  // const firstSectionHeight = document.querySelector('.headerBlock')

  // if(firstSectionHeight) {
  //   const headerBlockHeight = firstSectionHeight.offsetHeight;
  //   let btnElements = document.querySelectorAll('.btn-wr--js');

  //   document.addEventListener('scroll', () => {
  //     if(btnElements.length < 2) {
  //       btnElements = document.querySelectorAll('.btn-wr--js');
  //     }
  //     btnElements.forEach(btnElement => {
  //       if (window.scrollY >= headerBlockHeight) {
  //         btnElement.classList.add('show-btn');
  //       } else {
  //         btnElement.classList.remove('show-btn');
  //       }
  //     });
  //   });
  // }


  /* hide btn after scroll main page */

  gsap.registerPlugin(ScrollTrigger);

  let requiredCountOfBtns = 3;

  let buttons = document.querySelectorAll('.btn-wr--js');
  let headerSection = document.querySelector(".headerBlock");

  if (buttons.length < requiredCountOfBtns) {
    const onScroll = () => {
      buttons = document.querySelectorAll('.btn-wr--js');

      if (buttons.length >= requiredCountOfBtns) {
        setBtnsTrigger()
        document.removeEventListener('scroll', onScroll);
      }
    };

    document.addEventListener('scroll', onScroll);
  }

  setBtnsTrigger()

  function setBtnsTrigger() {
    if (headerSection && buttons.length) {

    let sectionHeight = headerSection.offsetHeight;

    buttons.forEach(button => {
      ScrollTrigger.create({
        trigger: headerSection,
        start: `top top+=${sectionHeight / 2}`,
        end: "bottom top",
        onEnter: () => button.classList.remove("show-btn"),
        onEnterBack: () => button.classList.remove("show-btn"),
        onLeaveBack: () => button.classList.add("show-btn"),
        onLeave: () => button.classList.add("show-btn"),
      });
    });
  }
  }

  // function isMobile() {
  //   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // }

  // if (isMobile() && document.getElementById('modal-mob')) {
  //   Fancybox.show([{
  //     src: "#modal-mob",
  //     type: "inline"
  //   }], {
  //     touch: false,
  //     dragToClose: false,
  //     autoFocus: false,
  //     trapFocus: false,
  //     placeFocusBack: false,
  //     groupAll: false,
  //     showClass: "fancybox-throwOutUp",
  //     hideClass: "fancybox-throwOutDown",
  //     compact: false,
  //     arrows: false
  //   });
  // }

    /* video*/
    const videoWrap = document.querySelector('.video-wrap')
    if (videoWrap) {
      videoWrap.addEventListener('click', function() {
  
      const video = document.querySelector('.video');
        if (video.paused) {
          video.play();
          video.classList.add('is-playing');
      } else {
          video.pause();
          video.classList.remove('is-playing');
      }
      });
    }
}

if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
