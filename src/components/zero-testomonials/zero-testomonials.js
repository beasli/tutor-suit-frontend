function initTestomonials() {
    var swiper = new Swiper(".testimonialCarousel", {
        pagination: {
            el: ".swiper-pagination",
            clickable:true
        },
      breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        580: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
    },
    });
}

function checkIfHTMLLoaded() {
    // Check if the HTML code is loaded in the DOM
    const customCode = document.querySelector('#testimonialCarousel');

    if (customCode) {
      // The HTML code is detected in the DOM
      initTestomonials();
    } else {
      // The HTML code is not yet loaded, wait and check again
      setTimeout(checkIfHTMLLoaded, 100); // Adjust the timeout as needed
    }
  }


  // Call the function to start checking if the HTML code is loaded
  checkIfHTMLLoaded();