/**
 * Initiate the build of the gallery and details modal.
 */
(initializeBuild = () => {
  const galleryContainer = document.getElementById('gallery');
  const modalContainer = document.querySelector('#modal .swiper-wrapper');
  const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  for (let galleryIndex = 0; galleryIndex < galleryData.length; galleryIndex++) {
    const imageData = galleryData[galleryIndex];
    const { src, title } = imageData;

    const Image = `<a class="image--wrapper" href="${src}"><img alt="${title}" src="${src}" data-index="${galleryIndex}" /></a>`;
    galleryContainer.innerHTML += Image;

    const { modalImageHeight, modalImageWidth } = getModalImageDimensions(imageData);
    const SwipeImage = `<div class="swiper-slide"><img alt="${title}" class="modal--image" height="${modalImageHeight}" width="${modalImageWidth}" src="${src}" data-index="${galleryIndex}" /></div>`;
    modalContainer.innerHTML += SwipeImage;
  }
})();

/**
 * Show and hide the details view including updating the header, footer, and showing the image modal.
 *
 * @param {object} event The on click event for toggling showing and hiding details.
 */
const toggleDetailsView = (event) => {
  event.preventDefault();

  const { target } = event;
  const main = document.querySelector('main');
  const mainHeaderTitle = document.querySelector('#main--header h1');
  const mainFooter = document.getElementById('main--footer');
  const modal = document.querySelector('#modal');
  const modalImages = document.querySelectorAll('.modal--image');
  const { alt, src, dataset: { index } } = target;
  const modalImage = modalImages[index];

  // Toggle classes which trigger CSS transitions
  console.log(main, mainFooter, modal)
  main.classList.toggle('details');
  mainFooter.classList.toggle('hidden');
  modal.classList.toggle('visible');

  if (new Set(main.classList).has('details')) {
    // Showing details view
    modalSwiper.slideTo(Number(index) + 1);
    // console.log(modalSwiper);
    mainHeaderTitle.innerText = alt;
  } else {
    // Hiding details view
    mainHeaderTitle.innerText = 'Image Gallery';
  }
}

// Set event listeners for the images and the close symbol ("X")
const images = document.querySelectorAll('.image--wrapper');
for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
  const Image = images[imageIndex];
  Image.addEventListener('click', toggleDetailsView);
}

document.querySelector('.close').addEventListener('click', toggleDetailsView);

// Set up the Swiper library for touch events and the details carousel.
const modalSwiper = new Swiper ('.swiper-container', {
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
  direction: 'horizontal',
  fadeEffect: {
    crossFade: true
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  loop: true,
});

// Capture on change event for swiping details to update image details in the UI.
modalSwiper.on('slideChange', () => {
  const index = modalSwiper.activeIndex - 1;
  const imageData = galleryData[index];
  const mainHeaderTitle = document.querySelector('#main--header h1');
  mainHeaderTitle.innerText = imageData.title;
});