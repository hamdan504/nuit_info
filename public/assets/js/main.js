/**
* Template Name: TheEvent
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Buy tickets select the ticket type on click
   */
  on('show.bs.modal', '#buy-ticket-modal', function(event) {
    select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
  })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });










// Function to change language and reload the page
function changeLanguage(lang) {
  fetch(`./public/assets/translation/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      updateContent(data);

      localStorage.setItem('selectedLanguage', lang);

    });
}

// Event listener for language dropdown items
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    var langCode = this.href.split('/').pop(); // Extract language code from the URL
    changeLanguage(langCode);
  });
});

function updateContent(data) {
  document.getElementById('title').textContent = data.title;
  document.getElementById('about').textContent = data.about; // Update 'intro' to 'about'
  document.getElementById('article').textContent = data.article;
  document.getElementById('pics').textContent = data.pics;
  document.getElementById('expert').textContent = data.expert;
  document.getElementById('go_further').textContent = data.go_further;
  document.getElementById('article_desc').textContent = data.article_desc;
  document.getElementById('p_article_desc').textContent = data.p_article_desc;
  document.getElementById('Climate_Change').textContent = data.Climate_Change;

  document.getElementById('i135_p').textContent = data.i135_p;
  document.getElementById('i140_h1').textContent = data.i140_h1;
  document.getElementById('i143_h2').textContent = data.i143_h2;
  document.getElementById('i144_p').textContent = data.i144_p;
  document.getElementById('i149_h2').textContent = data.i149_h2;
  document.getElementById('i151_p').textContent = data.i151_p;
  document.getElementById('i157_h2').textContent = data.i157_h2;
  document.getElementById('i159_p').textContent = data.i159_p;
  document.getElementById('i163_h2').textContent = data.i163_h2;
  document.getElementById('i165_p').textContent = data.i165_p;
  document.getElementById('i169_h2').textContent = data.i169_h2;
  document.getElementById('i171_p').textContent = data.i171_p;
  document.getElementById('i175_h2').textContent = data.i175_h2;
  document.getElementById('i176_p').textContent = data.i176_p;
  document.getElementById('i198_h2').textContent = data.i198_h2;


  document.getElementById('i199_p').textContent = data.i199_p;
  document.getElementById('i494_h2').textContent = data.i494_h2;
  document.getElementById('i198_h2').textContent = data.i198_h2;
  document.getElementById('i495_p').textContent = data.i495_p;
  document.getElementById('i505_h3').textContent = data.i505_h3;
  document.getElementById('i506_p').textContent = data.i506_p;
  document.getElementById('i515_h3').textContent = data.i515_h3;
  document.getElementById('i516_p').textContent = data.i516_p;
  document.getElementById('i525_h3').textContent = data.i525_h3;
  document.getElementById('i527_p').textContent = data.i527_p;
  document.getElementById('i608_h2').textContent = data.i608_h2;
  document.getElementById('i617_div').textContent = data.i617_div;
  document.getElementById('i621_p').textContent = data.i621_p;
  document.getElementById('i626_div').textContent = data.i626_div;
  document.getElementById('i630_p').textContent = data.i630_p;
  document.getElementById('i635_div').textContent = data.i635_div;
  document.getElementById('i639_p').textContent = data.i639_p;
  document.getElementById('i644_div').textContent = data.i644_div;
  document.getElementById('i648_p').textContent = data.i648_p;
  document.getElementById('i653_div').textContent = data.i653_div;
  document.getElementById('i657_p').textContent = data.i657_p;
  document.getElementById('i674_h2').textContent = data.i674_h2;
  document.getElementById('i675_p').textContent = data.i675_p;
  document.getElementById('i695_h2').textContent = data.i695_h2;
  document.getElementById('i696_p').textContent = data.i696_p;

  // Add more elements as needed
}

// Function to change language and reload the page
function changeLanguage(lang) {
  fetch(`./public/assets/translation/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      updateContent(data);
      updateFlag(lang); // Call the updateFlag function
      localStorage.setItem('selectedLanguage', lang);
    });
}

// On page load, check if a language is stored in local storage, otherwise default to English
window.addEventListener('load', function () {
  var storedLanguage = localStorage.getItem('selectedLanguage');
  changeLanguage(storedLanguage || 'en');
});


function updateFlag(lang) {
  const flagImage = document.getElementById('flagImage');
  if (flagImage) {
    const newFlagImage = new Image();
    newFlagImage.src = `https://flagcdn.com/w20/${lang}.png`;
    newFlagImage.srcset = `https://flagcdn.com/w40/${lang}.png 2x`;
    newFlagImage.width = 20;
    newFlagImage.alt = lang.toUpperCase();

    flagImage.parentNode.replaceChild(newFlagImage, flagImage);
  }
}


})()