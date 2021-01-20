gsap.registerPlugin(ScrollTrigger);

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

const heroImg = document.querySelector('.hero-img');
const heroImgMask = document.querySelector('.hero-img-mask');
const heroText = document.querySelectorAll('.hero-text');
const heroTextMask = document.querySelectorAll('.hero-text-mask');

function heroEnterAnimation() {
  // Sets mask and item opposites on y axis
  gsap.set([heroText, heroImg], { yPercent: 105 });
  gsap.set([heroImgMask, heroTextMask], { yPercent: -101 });

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
    onComplete: logoAnimation,
  });
}

window.addEventListener('load', () => {
  // logoAnimation();
  heroEnterAnimation();
});
