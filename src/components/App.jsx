import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export class App extends Component {
  state = {
    searchRequest: '',
  };

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    const { searchRequest } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery searchRequest={searchRequest} />
      </Container>
    );
  }
}
