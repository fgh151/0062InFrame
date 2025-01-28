	/* preloader */
  const preloaderAnimDuration = 1500
	let body = document.querySelector("body");

  body.classList.add('fixed-preloader')

  document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return

    setTimeout(() => {
      preloader.classList.add("hide");
      body.classList.remove("fixed-preloader");
    }, preloaderAnimDuration + 50);
  });
