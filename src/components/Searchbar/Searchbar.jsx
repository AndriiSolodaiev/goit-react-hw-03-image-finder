import { Formik } from 'formik';
import { toast } from 'react-toastify';
import {
  SearchbarS,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const initialValues = { search: '' };
  const handleSubmit = values => {
    if (values.search.trim() === '') {
      toast.error('Please enter something in the search.');
      return;
    }
    onSubmit(values.search);
  };
  return (
    <SearchbarS>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchForm autoComplete="off">
          <SearchFormButton type="submit">
            <FaSearch />
          </SearchFormButton>

          <SearchFormInput
            name="search"
            type="text"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchbarS>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
