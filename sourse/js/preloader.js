	/* preloader */
	let body = document.querySelector("body");

  body.classList.add('fixed-preloader')
	// if (pagePreloader) {
	// 	pagePreloader.classList.add("d-none");
	// }

  document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return

    setTimeout(() => {
      preloader.classList.add("hide");
      body.classList.remove("fixed-preloader");
    }, 4000);
  });
