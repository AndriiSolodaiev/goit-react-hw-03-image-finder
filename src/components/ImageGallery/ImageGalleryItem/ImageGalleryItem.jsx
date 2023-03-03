import { Li, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, onClick }) => {
  return (
    <Li onClick={onClick}>
      <Img src={webformatURL} alt="" />
    </Li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
