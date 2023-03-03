import { Li, Img } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <Li onClick={onClick}>
      <Img src={webformatURL} alt="" />
    </Li>
  );
};
