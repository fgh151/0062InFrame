	/* preloader */
  const preloaderAnimDuration = 4000
	let body = document.querySelector("body");

  body.classList.add('fixed-preloader')

  document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return

    setTimeout(() => {
      preloader.classList.add("hide");
      body.classList.remove("fixed-preloader");
    }, preloaderAnimDuration);
  });
