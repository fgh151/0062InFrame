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
			},
		},
	});

	const cardsFlip = document.querySelectorAll(".item-nomin--js");
	if (cardsFlip.length) {
		cardsFlip.forEach(card => {
			card.addEventListener("click", () => card.classList.toggle("active"));
		});
	}

	new Swiper(".auto-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

	new Swiper(".sFrameSlider__slider--js", {
		slidesPerView: "auto",
		// freeMode: true,
		// watchOverflow: true,
		speed: 600,
		navigation: {
			nextEl: ".sFrameSlider .swiper-button-next",
			prevEl: ".sFrameSlider .swiper-button-prev",
		},
		// parallax: true,§

		// on: {
		//   reachEnd: function () {
		//     this.slideTo(0);
		//   },
		// },
	});

	$(".filter-btn-js").click(function () {
		$(this).toggleClass("active");
		$(".sidebar--js").slideToggle(function () {
			$(this).toggleClass("active");
		});
	});

	$(".btn-toggle-type-input").click(function () {
		let icon = $(this).find("svg.icon use");
		let iconId = $(this).find("svg.icon use").attr("xlink:href").split("#")[1];

		let href = $(this).data('href');

    const opt = {
      "eye-off": ["eye", "text"],
			eye: ["eye-off", "password"],
		};
		$(this).parent().find("input").attr("type", opt[iconId][1]);
		icon.attr("xlink:href",`${href}img/svg/sprite.svg#${opt[iconId][0]}`);
	});

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

	let buttons = document.querySelectorAll(".btn-wr--js");
	let headerSection = document.querySelector(".headerBlock");

	if (buttons.length < requiredCountOfBtns) {
		const onScroll = () => {
			buttons = document.querySelectorAll(".btn-wr--js");

			if (buttons.length >= requiredCountOfBtns) {
				setBtnsTrigger();
				document.removeEventListener("scroll", onScroll);
			}
		};

		document.addEventListener("scroll", onScroll);
	}

	setBtnsTrigger();

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

	function isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}

	let wasShown = false;

	if (isMobile() && document.getElementById("modal-mob") && !wasShown) {
		wasShown = true;

		Fancybox.show(
			[
				{
					src: "#modal-mob",
					type: "inline",
				},
			],
			{
				touch: false,
				dragToClose: false,
				autoFocus: false,
				trapFocus: false,
				placeFocusBack: false,
				groupAll: false,
				showClass: "fancybox-throwOutUp",
				hideClass: "fancybox-throwOutDown",
				compact: false,
				arrows: false,
			}
		);
	}

	const activeItems = document.querySelectorAll(".parts-item.active");

	if (activeItems.length > 0) {
		const lastActiveItem = activeItems[activeItems.length - 1];

		lastActiveItem.insertAdjacentHTML(
			"beforeend",
			`<div class="current">
              <span>Текущий этап</span>
              <img src="img/svg/arr-top.svg" alt="">
          </div>`
		);
	}

	/* input-wrap */
	document.addEventListener("click", function (event) {
		if (event.target.closest(".icon-delete")) {
			const inputWrap = event.target.closest(".input-wrap");
			if (inputWrap) {
				inputWrap.remove();
			}
		}
	});

	const addBtns = document.querySelectorAll(".add-input-js");
	if (addBtns.length) {
		addBtns.forEach(addBtn => {
			addBtn.addEventListener("click", e => {
				e.preventDefault();
				const inputsContainer = addBtn.parentElement.previousElementSibling;
				const maxCount = inputsContainer.getAttribute("data-max");
				const inputs = inputsContainer.querySelectorAll("input");
				const firstPlaceholder = inputs[0].getAttribute("placeholder");
				const secondPlaceholder = inputs[1].getAttribute("placeholder");

				if (inputsContainer) {
					const inputCount =
						inputsContainer.querySelectorAll(".input-wrap").length;

					if (inputCount >= maxCount) {
						return;
					}
					const newInputWrap = `
          <div class="input-wrap">
            <button class="icon-delete">
              <svg class="icon icon-x ">
                <use xlink:href="img/svg/sprite.svg#x"></use>
              </svg>
            </button>
            <input type="text" placeholder="${firstPlaceholder}" class="form-control">
            <input type="text" placeholder="${secondPlaceholder}" class="form-control">
          </div>
        `;

					inputsContainer.insertAdjacentHTML("beforeend", newInputWrap);
				}
			});
		});
	}

	/* file upload */
	const fileUploads = document.querySelectorAll(".file-container--js");

	if (fileUploads.length) {
		fileUploads.forEach(element => {
			const fileInput = element.querySelector(".file-upload");
			const filesContainer = element.querySelector(".files");

			fileInput.addEventListener("change", () => {
				const isMultiple = fileInput.hasAttribute("multiple");
				const files = Array.from(fileInput.files);

				if (!isMultiple) {
					filesContainer.innerHTML = "";
				}

				files.forEach(file => {
					const existingFile = Array.from(
						filesContainer.querySelectorAll(".file-name")
					).some(fileNameEl => fileNameEl.textContent === file.name);

					if (!existingFile) {
						const fileInfo = document.createElement("div");
						fileInfo.classList.add("file-info");

						const fileElement = document.createElement("span");
						fileElement.classList.add("file-name");
						fileElement.textContent = file.name;

						const removeButton = document.createElement("span");
						removeButton.classList.add("remove-file");
						removeButton.innerHTML = `<svg class="icon icon-x"><use xlink:href="img/svg/sprite.svg#x"></use></svg>`;

						removeButton.addEventListener("click", () => {
							fileInfo.remove();
						});

						fileInfo.appendChild(fileElement);
						fileInfo.appendChild(removeButton);

						filesContainer.appendChild(fileInfo);
					}
				});
			});
		});
	}

	const allTextareas = document.querySelectorAll("textarea[data-value]");

	if (allTextareas.length) {
		allTextareas.forEach(textarea => {
			const dataValue = textarea.getAttribute("data-value");
			textarea.value = dataValue;
		});
	}

	/* textarea maxlength */
	const textareas = document.querySelectorAll("textarea[maxlength]");

	if (textareas.length) {
		textareas.forEach(textarea => {
			let maxLength = textarea.getAttribute("maxlength");
			if (maxLength === "maxlength") {
				maxLength = 1000;
			}

			const charCounter = document.createElement("div");
			const currentLength = textarea.value.length;
			charCounter.classList.add("char-counter", "small", "text-secondary");
			charCounter.textContent = `${currentLength}/${maxLength}`;

			textarea.insertAdjacentElement("afterend", charCounter);

			textarea.addEventListener("input", () => {
				const currentLength = textarea.value.length;
				charCounter.textContent = `${currentLength}/${maxLength}`;
			});
		});
	}

	/* video*/
	const videoWrap = document.querySelector(".video-wrap");
	if (videoWrap) {
		videoWrap.addEventListener("click", function () {
			const video = document.querySelector(".video");
			if (video.paused) {
				video.play();
				video.classList.add("is-playing");
			} else {
				video.pause();
				video.classList.remove("is-playing");
			}
		});
	}


  const infoWindows = document.querySelectorAll(".info-window--js");
	if (infoWindows) {
		infoWindows.forEach(el => {
			const closeBtn = el.querySelector(".close-btn");
			if (!closeBtn) return;
			closeBtn.addEventListener("click", () => {
				el.classList.add("hidden");
			});
		});
	}

	const tiny = document.querySelectorAll(".tinny-item-js");
	tiny.forEach(el => {
		const template = el.querySelector(".tinny-template");

		tippy(el, {
			content: template.innerHTML,
			allowHTML: true,
			interactive: true,
			placement: "bottom-start",
		});
	});

	const consultBtn = document.querySelector(".consult--js");
	if (consultBtn) {
		consultBtn.addEventListener("click", event => {
			const thanksWindow = document.querySelector(".thanks-window.hidden");

			if (thanksWindow) {
				thanksWindow.classList.remove("hidden");
				consultBtn.closest(".info-window--js").classList.add("hidden");
			}
		});
	}

	let consultWindowIsShown = false;

	const infoWindow = document.querySelector(
		".info-window--js.consult-info.hidden"
	);
	if (infoWindow) {
		setTimeout(function () {
			if (consultWindowIsShown) return;
			infoWindow.classList.remove("hidden");
		}, 5000);
	}

	const questionBtns = document.querySelectorAll(".consult-info-header-btn");
	if (questionBtns.length) {
		questionBtns.forEach(btn => {
			btn.addEventListener("click", event => {
				event.preventDefault();
				const consultWindow = document.querySelector(".consult-info.hidden");
				consultWindowIsShown = true;

				if (consultWindow) {
					consultWindow.classList.remove("hidden");
				}
			});
		});
	}

	/* Form inputs */
	// const inputs = document.querySelectorAll(".sForm input[required]");

	// if (inputs.length) {
	// 	inputs.forEach(input => {
	// 		const toggleVisibility = () => {
	// 			if (input.type !== "tel") {
	// 				input.previousSibling.style.visibility =
	// 					input.value.length > 0 ? "hidden" : "visible";
	// 			}
	// 		};

	// 		input.addEventListener("input", toggleVisibility);

	// 		if (input.type === "tel") {
	// 			input.addEventListener("focus", () => {
	// 				input.previousSibling.style.visibility = "hidden";
	// 			});

	// 			input.addEventListener("blur", () => {
	// 				if (input.value.length === 0) {
	// 					input.previousSibling.style.visibility = "visible";
	// 				}
	// 			});
	// 		}
	// 	});
	// }

	const template = document.getElementById("template");
	if (template) {
		tippy(".tooltip-icon", {
			content: template.innerHTML,
			allowHTML: true,
			theme: "light",
		});
	}

	$(document).on("click", ".reset-pass-block-toggle", function (e) {
		e.preventDefault();

		console.log($(this).attr("href"));

		$(this)
			.parents(".modal-win")
			.find(".reset-pass-block.active")
			.hide()
			.removeClass("active");
		$(this)
			.parents(".modal-win")
			.find($(this).attr("href"))
			.fadeIn()
			.addClass("active");
	});

	let tgBannerVersion = localStorage.getItem('tgBannerVersion'); // type = 'agressive' | 'intelligent';

	if(!tgBannerVersion) {
		const randomNum = Math.random() * 100;
		tgBannerVersion = randomNum < 50 ? 'intelligent' : 'agressive';
		localStorage.setItem('tgBannerVersion', tgBannerVersion);
	} 

	if(tgBannerVersion === 'agressive') {
		const aggressiveBtnJoin = document.querySelector('.aggressiveBtnJoin');
		const tgSubscribeButton = document.querySelector('.tgSubscribeButtonV2');
		const mobileTgSubscribtionButton = document.querySelector('.mobileTgSubscribtionButton');
		const aggressiveCloseBtn = document.querySelector('#aggressive-close-btn');
		const aggressiveModalContentBtn = document.querySelector('.aggressiveModalContent-button');
		const aggressiveMobileTgBanner = document.querySelector('#aggressiveMobileTgBanner');
		const aggressiveCloseBtnMobile = document.querySelector('.aggressiveMobileTgBannerTop-closeBtn');

		// Отключаем интеллигентный баннер
		mobileTgSubscribtionButton.style.display = 'none';
		tgSubscribeButton.style.display = 'none';

		setTimeout(() => {
			if(window.innerWidth > 576) {
				Fancybox.show(
					[
					 {
						src: "#modal-aggressive-tg",
						type: "inline",
					 },
					],
					{
					 touch: false,
					 dragToClose: false,
					 autoFocus: false,
					 trapFocus: false,
					 placeFocusBack: false,
					 groupAll: false,
					 showClass: "fancybox-throwOutUp",
					 hideClass: "fancybox-throwOutDown",
					 compact: false,
					 arrows: false,
					 buttons: [],
					 template: {
						closeButton: null,
					},
					}
				 );
			} else {
				aggressiveMobileTgBanner.style.display = 'block';
			}
		}, 30000);

		aggressiveCloseBtn.addEventListener('click', () => {
			Fancybox.close();
		})

		aggressiveCloseBtnMobile.addEventListener('click', () => {
			aggressiveMobileTgBanner.style.display = 'none';
		})

		aggressiveModalContentBtn.addEventListener('click', () => {
			window.open('https://t.me/+LOtAty8EbRM0OGEy', '_blank')
		})

		aggressiveBtnJoin.addEventListener('click', () => {
			window.open('https://t.me/+LOtAty8EbRM0OGEy', '_blank')
		})
	} 
	
	if(tgBannerVersion === 'intelligent'){
		const tgSubscribeButton = document.querySelector('.tgSubscribeButtonV2');
		const closeTgBanner = document.querySelector('.close-tg-qr');
		const mobileCloseTgQr = document.querySelector('.mobile-close-tg-qr');
		const aggressiveModal = document.querySelector('#aggressiveModalInner');
		const aggressiveMobileTgBanner = document.querySelector('#aggressiveMobileTgBanner');
		const mobileTgSubscribtionButton = document.querySelector('.mobileTgSubscribtionButton');
		const subscribeButtonContentLeftColumnButton = document.querySelector('.subscribeButtonContentLeftColumn-button');

		// Отключаем агрессивный баннер
		aggressiveMobileTgBanner.style.display = 'none';
		aggressiveModal.style.display = 'none';

		// Включаем интеллигентный баннер
		if(window.innerWidth > 576) {
			tgSubscribeButton.style.display = 'flex';
		} else {
			mobileTgSubscribtionButton.style.display = 'flex';
		}

		tgSubscribeButton.addEventListener('click', () => {
			if(tgSubscribeButton.classList.contains('tgSubscribeButtonV2-closed')) {
				tgSubscribeButton.classList.remove('tgSubscribeButtonV2-closed');
			}
		})
			
		closeTgBanner.addEventListener('click', () => {
			setTimeout(() => {
				tgSubscribeButton.classList.add('tgSubscribeButtonV2-closed');
			}, 0);
		});

		subscribeButtonContentLeftColumnButton.addEventListener('click', () => {
			window.open('https://t.me/+LOtAty8EbRM0OGEy', '_blank')
		});

		mobileTgSubscribtionButton.addEventListener('click', () => {
			window.open('https://t.me/+LOtAty8EbRM0OGEy', '_blank')
		});

		mobileCloseTgQr.addEventListener('click', (e) => {
			e.stopPropagation();
			mobileTgSubscribtionButton.style.display = 'none';
		})

		document.addEventListener('click', (event) => {
			if (
				!tgSubscribeButton.contains(event.target)
			) {
				setTimeout(() => {
					tgSubscribeButton.classList.add('tgSubscribeButtonV2-closed');
				}, 0);
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
