$(document).ready(function () {
	// Fancybox init
	if (document.querySelector('[data-fancybox]')) {
		Fancybox.bind('[data-fancybox]', {
			dragToClose: false,
			closeButton: false,
		});
	}

	//Animate blocks
	function initializeAOS() {
		if (window.innerWidth > 1199.98) {
			AOS.init({
				//easing: 'ease-out-back',
				offset: 200,
				delay: 400,
				duration: 700,
				once: true,
			});
		}
	}
	initializeAOS();
	window.addEventListener('resize', () => {
		AOS.refreshHard();
		initializeAOS();
	});

	// Logos carousel
	const tracks = document.querySelectorAll('.logos__track');
	if (tracks.length) {
		tracks.forEach(track => {
			if (!track.classList.contains('is-duplicated')) {
				track.innerHTML += track.innerHTML;
				track.classList.add('is-duplicated');
			}
		});
	}
});

//Hero slider
document.addEventListener("DOMContentLoaded", function () {
	const heroBgs = document.querySelector(".hero__bgs");

	if (heroBgs) {
		const slides = heroBgs.querySelectorAll("img");
		if (slides.length === 0) return;

		let current = 0;

		setInterval(() => {
			slides[current].classList.remove("active");
			current = (current + 1) % slides.length;
			slides[current].classList.add("active");
		}, 5000);
	}
});

// Add .header--scroll to Header
function updateHeaderScrollClass() {
	const header = document.querySelector('.header');
	if (!header) return;
	
	if (window.scrollY > 0) {
		header.classList.add('header--scroll');
	} else {
		header.classList.remove('header--scroll');
	}
}
document.addEventListener('scroll', updateHeaderScrollClass);
document.addEventListener('DOMContentLoaded', updateHeaderScrollClass);

// Scroll links
document.addEventListener('DOMContentLoaded', function () {
	const OFFSET_DESKTOP = 76;
	const OFFSET_MOBILE = 60;
	const MOBILE_BREAKPOINT = 1079.98;

	const header = document.querySelector('.header');
	const burgerBtn = document.querySelector('.header__mobile-burger');
	const mobileMenu = document.querySelector('.header__mobile-menu');

	burgerBtn.addEventListener('click', function () {
		burgerBtn.classList.toggle('active');
		mobileMenu.classList.toggle('active');
		header.classList.toggle('open-menu');
	});

	function getHeaderOffset() {
		return window.innerWidth <= MOBILE_BREAKPOINT ? OFFSET_MOBILE : OFFSET_DESKTOP;
	}

	function scrollToTarget(id) {
		const target = document.getElementById(id);
		if (target) {
			const offset = getHeaderOffset();
			const top = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({
				top: top,
				behavior: 'smooth'
			});
		}
	}

	function handleLinkClick(e) {
		const href = this.getAttribute('href');
		if (href.startsWith('#') && href.length > 1) {
			e.preventDefault();
			const id = href.substring(1);
			scrollToTarget(id);

			if (window.innerWidth <= MOBILE_BREAKPOINT) {
				burgerBtn.classList.remove('active');
				mobileMenu.classList.remove('active');
				header.classList.remove('open-menu');
			}
		}
	}

	const links = document.querySelectorAll('a[href^="#"]:not([href="#"]), .scroll-btn');
	links.forEach(link => {
		link.addEventListener('click', handleLinkClick);
	});
});

// Scroll to Top
document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById("scr_top");
    const scrollOffset = 800;

	if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > scrollOffset);
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

//Counters
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counters__item-num");
  let animated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const duration = 1000;
      const stepTime = 20; 
      let current = 0;
      const increment = target / (duration / stepTime);

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (
        entry.isIntersecting &&
		//window.innerWidth > 599.98 &&
        !animated
      ) {
        animated = true;
        setTimeout(() => {
          animateCounters();
        }, 1000);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroCounters = document.querySelector(".counters__items");
  if (heroCounters) {
    observer.observe(heroCounters);
  }
});

// Toggles
document.addEventListener('DOMContentLoaded', function () {
	const toggleBlocks = document.querySelectorAll('.block__toggle');

	if (toggleBlocks.length === 0) {
		return;
	}

	toggleBlocks.forEach(block => {
		const header = block.querySelector('.toggle__header');
		const button = block.querySelector('.toggle__header-btn');
		const content = block.querySelector('.toggle__content');

		if (!header || !button || !content) {
			return;
		}

		header.addEventListener('click', function () {
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
				content.style.paddingBottom = null;
				button.classList.remove('v_active');
				content.classList.remove('c_active');
				block.classList.remove('t_active');
			} else {
				content.style.maxHeight = content.scrollHeight + 15 + 'px';
				content.style.paddingBottom = '15px';
				button.classList.add('v_active');
				content.classList.add('c_active');
				block.classList.add('t_active');
			}
		});
	});
});

// Reviews carousel swiper
document.addEventListener('DOMContentLoaded', function () {
	const breakpoint = 767.98;
	const carousels = document.querySelectorAll('.reviews__carousel');

	if (!carousels.length) return;

	carousels.forEach((carousel) => {
		let swiperInstance = null;
		const initOrDestroy = () => {
			if (window.innerWidth <= breakpoint) {
				if (!swiperInstance) {
					swiperInstance = new Swiper(carousel, {
						slidesPerView: 1.1,
						spaceBetween: 20,
						allowTouchMove: true,
						loop: true,
						speed: 600,
					});
				}
			} else {
				if (swiperInstance) {
					swiperInstance.destroy(true, true);
					swiperInstance = null;
				}
			}
		};
		initOrDestroy();
		window.addEventListener('resize', initOrDestroy);
	});
});