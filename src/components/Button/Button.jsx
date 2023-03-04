import { ButtonS } from './Button.styled';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disableButton: PropTypes.bool.isRequired,
};
