gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let bodyScrollBar;

gsap.set('#main-page', { autoAlpha: 0 });

const loadingContent = document.querySelector('.loading-content');
const loadingBorder = document.querySelectorAll('.loading-border');

// Intro animation on load
function introBorderSlide() {
  gsap.set('.loading-border', { autoAlpha: 1 });

  let int = setInterval(() => {
    loadingContent.textContent += '.';
  }, 500);

  setTimeout(() => {
    clearInterval(int);
  }, 2100);

  // Sets each side of square to correct position
  gsap.set('.loading-border-top', { xPercent: -100 });
  gsap.set('.loading-border-right', { yPercent: -100 });
  gsap.set('.loading-border-bottom', { xPercent: 100 });
  gsap.set('.loading-border-left', { yPercent: 100 });

  // After animation complete runs start function
  const tl = gsap.timeline({
    defaults: { duration: 0.5 },
    onComplete: start,
  });

  // square loading animation
  tl.to('.loading-border-top', { xPercent: 0 }, 0.5)
    .to('.loading-border-right', { yPercent: 0 })
    .to('.loading-border-bottom', { xPercent: 0 })
    .to('.loading-border-left', { yPercent: 0 })
    .to(loadingBorder, { borderRadius: '50%' })
    .to('.loading', { overflow: 'visible', duration: 0 })
    .to(loadingBorder, { width: '120vw', height: '120vw', duration: 1 })
    .to('#intro', { autoAlpha: 0 }, '-=1');
}

// cursor follow animation
function cursor() {
  const mouse = document.querySelector('.cursor');

  let mouseX = 0;
  let mouseY = 0;

  let ballX = 0;
  let ballY = 0;

  let speed = 0.1;

  // moves cursor div around following mouse
  function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX = ballX + distX * speed;
    ballY = ballY + distY * speed;

    mouse.style.left = `${ballX}px`;
    mouse.style.top = `${ballY}px`;

    requestAnimationFrame(animate);
  }

  animate();

  // sets initial follow
  function cursorFollow(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  }

  document.addEventListener('mousemove', cursorFollow);
}

// scrolls to image section if user clicks on hero
// inits smooth scrolling if over 900px
if (window.innerWidth > 900) {
  document.querySelector('.hero-section').addEventListener('click', (e) => {
    bodyScrollBar.scrollIntoView(document.querySelector('.projects'), {
      damping: 0.07,
      offsetTop: -32,
    });
  });
  initSmoothScrollbar();
}

const logoText = document.querySelector('.logo');
const logoTextContent = logoText.textContent;
const logoSplitText = logoTextContent.split('');
logoText.textContent = '';

// Slides letters in from 50px
function logoAnimation() {
  logoSplitText.forEach((letter) => {
    // Adds space for multiple words
    if (letter === ' ') {
      logoText.innerHTML += `<span class="logo-span" style="width: 1rem">${letter}</span>`;
    } else {
      logoText.innerHTML += `<span class="logo-span">${letter}</span>`;
    }
  });

  const int = setInterval(logoLetterAnim, 50);
  let char = 0;

  // Adds css class to each letter and clears interval when done
  function logoLetterAnim() {
    const span = logoText.querySelectorAll('.logo-span')[char];
    span.classList.add('logo-text-fade');
    char++;

    if (char === logoSplitText.length) {
      clearInterval(int);
      return;
    }
  }
}

// Scrolls to top of page when logo clicked
const heroSection = document.querySelector('.hero-section');
logoText.addEventListener('click', () => {
  gsap.to(window, { duration: 1.5, scrollTo: heroSection, ease: 'power4.out' });
});

const heroImg = document.querySelector('.hero-img');
const heroImgMask = document.querySelector('.hero-img-mask');
const heroText = document.querySelectorAll('.hero-text');
const heroTextMask = document.querySelectorAll('.hero-text-mask');

// Sets mask and item opposites on y axis
gsap.set([heroText, heroImg], { yPercent: 105 });
gsap.set([heroImgMask, heroTextMask], { yPercent: -101 });
function heroEnterAnimation() {
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power1.out',
    },
  });

  // Moves mask and item back to 0 on y axis
  tl.to([heroText, heroTextMask], {
    yPercent: 0,
  }).to([heroImg, heroImgMask], {
    yPercent: 0,
    onComplete: () => {
      logoAnimation();
      projectsEnterAnimation();
      detailsEnterAnimation();
      imageParallaxScroll();
    },
  });
}

const projectTextH = document.querySelectorAll('.project-text-h');
const projectTextHMask = document.querySelectorAll('.project-text-h-mask');
const projectTextP = document.querySelectorAll('.project-text-p');
const projectTextPMask = document.querySelectorAll('.project-text-p-mask');

const projectImage = document.querySelectorAll('.project-img');
const projectImageMask = document.querySelectorAll('.project-img-mask');

// Sets mask and item opposites on y axis
gsap.set([projectImage, projectTextHMask, projectTextPMask], { yPercent: 105 });
gsap.set([projectTextP, projectTextH, projectImageMask], { yPercent: -101 });

function projectsEnterAnimation() {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'power1.out',
    },
  });

  // creates scroll trigger for each grid image
  projectImage.forEach((img, index) => {
    ScrollTrigger.create({
      trigger: img,
      start: 'top 90%',
      onEnter: () => {
        tl.to([img, projectImageMask[index]], {
          yPercent: 0,
        });
      },
    });
  });

  // creates scroll trigger for each grid text
  projectTextH.forEach((text, index) => {
    ScrollTrigger.create({
      trigger: text,
      start: 'top 80%',
      onEnter: () => {
        tl.to(
          [
            text,
            projectTextHMask[index],
            projectTextP[index],
            projectTextPMask[index],
          ],
          {
            yPercent: 0,
          }
        );
      },
    });
  });
}

function imageParallaxScroll() {
  projectImage.forEach((img) => {
    gsap.to(img, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        scrub: true,
      },
    });
  });
}

const dividers = document.querySelectorAll('.divider-line');

const detailsTextH = document.querySelectorAll('.details-text-h');
const detailsTextHMask = document.querySelectorAll('.details-text-h-mask');
const detailsTextP = document.querySelectorAll('.details-text-p');
const detailsTextPMask = document.querySelectorAll('.details-text-p-mask');

gsap.set([detailsTextHMask, detailsTextPMask], { yPercent: 105 });
gsap.set([detailsTextP, detailsTextH], { yPercent: -101 });

gsap.set(dividers, { y: 50, autoAlpha: 0 });
gsap.set(dividers, { y: 50, autoAlpha: 0 });

function detailsEnterAnimation() {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'power1.out',
    },
  });

  dividers.forEach((divider, index) => {
    ScrollTrigger.create({
      trigger: divider,
      start: 'top 80%',
      onEnter: () => {
        tl.to(divider, { y: 0, autoAlpha: 1 });
        tl.to(
          [
            detailsTextP[index],
            detailsTextH[index],
            detailsTextHMask[index],
            detailsTextPMask[index],
          ],
          { yPercent: 0 }
        );
      },
    });
  });
}

function start() {
  gsap.set('#main-page', { autoAlpha: 1 });

  heroEnterAnimation();
  cursor();
}

function initSmoothScrollbar() {
  bodyScrollBar = Scrollbar.init(document.querySelector('#main-page'), {
    damping: 0.07,
  });

  // remove horizontal scrollbar
  bodyScrollBar.track.xAxis.element.remove();

  // keep scrollTrigger in sync with smooth scrollbar
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value; // setter
      }
      return bodyScrollBar.scrollTop; // getter
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // when the smooth scroller updates, tell ScrollTrigger to update() too:
  bodyScrollBar.addListener(ScrollTrigger.update);
}

window.addEventListener('load', () => {
  introBorderSlide();
});
