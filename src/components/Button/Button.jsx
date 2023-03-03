import { ButtonS } from './Button.styled';

export const Button = ({ onClick, disableButton }) => {
  const handleButtonClick = () => {
    onClick();
  };
  return (
    <ButtonS type="button" onClick={handleButtonClick} disabled={disableButton}>
      Load More
    </ButtonS>
  );
};
