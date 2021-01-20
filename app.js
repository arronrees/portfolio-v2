gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

    // if user scrolled past hero remove arrow
    if (e.pageY < window.innerHeight) {
      mouse.classList.add('initial');
    } else {
      mouse.classList.remove('initial');
    }
  }

  document.addEventListener('mousemove', cursorFollow);
}

// scrolls to image section if user clicks on hero
if (window.innerWidth > 900) {
  console.log(window.innerWidth);
  document.querySelector('.hero-section').addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: '.projects' });
  });
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

window.addEventListener('load', () => {
  heroEnterAnimation();
  cursor();
});
