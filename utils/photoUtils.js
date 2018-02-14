/**
 * Get the dimensions for the incoming image based on the height and width of the container.
 *
 * @param {object} imageData An object containing the pertinent of the image.
 * @return {object} Returns the image height and width for the modal.
 */
const getModalImageDimensions = (imageData) => {
  const imageBaseHeight = imageData.height;
  const imageBaseWidth = imageData.width;

  const orientation = (imageBaseHeight > imageBaseWidth) ? 'vertical' : 'horizontal';

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