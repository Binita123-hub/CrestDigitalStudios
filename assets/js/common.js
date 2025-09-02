

// header scroll effect
// document.addEventListener('DOMContentLoaded', function() {
//   const header = document.querySelector('header');
//   const scrollThreshold = 100; // Adjust this value as needed
  
//   window.addEventListener('scroll', function() {
//     if (window.scrollY > scrollThreshold) {
//       header.classList.add('header-scrolled');
//     } else {
//       header.classList.remove('header-scrolled');
//     }
//   });
// });



// header scroll effect
document.addEventListener('DOMContentLoaded', function() {
  const navigation = document.querySelector('.nav-bar');  
  
  window.addEventListener('scroll', function() {
    if (window.scrollY ) {
      navigation.classList.add('fixed-nav');
    } else {
      navigation.classList.remove('fixed-nav');
    }
  });
});




// AnimateOnScroll //
const AnimateOnScroll = function ({ offset } = { offset: 10 }) {
  const windowTop = (offset * window.innerHeight) / 100;
  const windowBottom = window.innerHeight - windowTop;
  const windowLeft = 0;
  const windowRight = window.innerWidth;

  this.start = (element) => {
    window.requestAnimationFrame(() => {
      element.style.animationDelay = element.dataset.animationDelay;
      element.style.animationDuration = element.dataset.animationDuration;
      element.classList.add(element.dataset.animation);
      element.dataset.animated = "true";
    });
  };

  this.inViewport = (element) => {
    const elementRect = element.getBoundingClientRect();
    const elementTop =
      elementRect.top + parseInt(element.dataset.animationOffset) ||
      elementRect.top;
    const elementBottom =
      elementRect.bottom - parseInt(element.dataset.animationOffset) ||
      elementRect.bottom;
    const elementLeft = elementRect.left;
    const elementRight = elementRect.right;
    return (
      elementTop <= windowBottom &&
      elementBottom >= windowTop &&
      elementLeft <= windowRight &&
      elementRight >= windowLeft
    );
  };

  this.verifyElementsInViewport = (els = elements) => {
    for (let i = 0, len = els.length; i < len; i++) {
      if (els[i].dataset.animated) continue;

      this.inViewport(els[i]) && this.start(els[i]);
    }
  };

  this.getElements = () =>
    document.querySelectorAll("[data-animation]:not([data-animated])");

  this.update = () => {
    elements = this.getElements();
    elements && this.verifyElementsInViewport(elements);
  };

  window.addEventListener("load", this.update, false);
  window.addEventListener(
    "scroll",
    () => this.verifyElementsInViewport(elements),
    { passive: true }
  );
  // window.addEventListener(
  //   "resize",
  //   () => this.verifyElementsInViewport(elements),
  //   { passive: true }
  // );
};

const options = {
  offset: 15 // percentage of the window
};

const animation = new AnimateOnScroll(options);



