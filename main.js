const galleryData = [
  {
    height: 1357,
    src: 'https://farm3.staticflickr.com/2946/15392560891_62da36f6c3_k.jpg',
    title: 'Midnight Wonder',
    width: 2048,
  },
  {
    height: 2048,
    src: 'https://farm4.staticflickr.com/3912/14597212688_a93df48564_k.jpg',
    title: 'Ellie Nouveau',
    width: 1357,
  },
  {
    height: 1356,
    src: 'https://farm9.staticflickr.com/8705/16957061882_22a1ebb574_k.jpg',
    title: 'Dragonfly',
    width: 2048,
  },
  {
    height: 678,
    src: 'https://farm3.staticflickr.com/2901/14305146627_6456a6983a_b.jpg',
    title: 'Cape Zanpa Lighthouse',
    width: 1024,
  },
  {
    height: 683,
    src: 'https://farm4.staticflickr.com/3706/11475014865_c8cd0a6969_b.jpg',
    title: 'Djibouti Sunset',
    width: 1024,
  },
  {
    height: 590,
    src: 'https://farm4.staticflickr.com/3680/11573443264_b0e99bcc19_b.jpg',
    title: 'Sling Load Djibouti, Africa',
    width: 1024,
  },
  {
    height: 1024,
    src: 'https://farm4.staticflickr.com/3816/10262191355_f6c9904491_b.jpg',
    title: 'Geoff Weers of &quot;The Expendables&quot;',
    width: 678,
  },
  {
    height: 622,
    src: 'https://farm6.staticflickr.com/5340/10284648283_fec3a983dd_b.jpg',
    title: 'Aircrew Along for the Ride',
    width: 1024,
  },
  {
    height: 871,
    src: 'https://farm3.staticflickr.com/2857/10451977815_0cae42e8e7_b.jpg',
    title: 'Reflections of the World Above',
    width: 1024,
  },
];

/**
 *
 *
 * @param {object} imageData
 * @return {object}
 */
const getModalImageDimensions = (imageData) => {
  const orientation = (imageBaseHeight > imageBaseWidth) ? 'vertical' : 'horizontal';

  const imageBaseHeight = imageData.height;
  const imageBaseWidth = imageData.width;

  // #modal { height: calc(100vh - #{$headerHeight} - 96px);
  const modalHeight = window.innerHeight - 216;
  const modalWidth = 646;

  let modalImageHeight = 0;
  let modalImageWidth = 0;

  // Set the height and width of the details image in the modal based on orientation.
  if (orientation === 'vertical') {
    modalImageHeight = modalHeight;
    modalImageWidth = modalHeight / imageBaseHeight * imageBaseWidth;
  } else {
    modalImageHeight = modalWidth / imageBaseWidth * imageBaseHeight;
    modalImageWidth = modalWidth;
  }

  // Catch cases where the image dimensions set by orientation are larger than the allowable area in the modal.
  if (modalImageHeight > modalHeight) {
    modalImageHeight = modalHeight;
    modalImageWidth = modalHeight / imageBaseHeight * imageBaseWidth;
  }

  if (modalImageWidth > modalWidth) {
    modalImageHeight = modalWidth / imageBaseWidth * imageBaseHeight;
    modalImageWidth = modalWidth;
  }

  return {
    modalImageHeight,
    modalImageWidth,
  };
}

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

modalSwiper.on('slideChange', () => {
  const index = modalSwiper.activeIndex - 1;
  const imageData = galleryData[index];
  const mainHeaderTitle = document.querySelector('#main--header h1');
  mainHeaderTitle.innerText = imageData.title;
});