import { ImageGalleryItem } from './ImageGalleryItem';
import { Component } from 'react';
import { List } from './ImageGallery.styled';
import { Modal } from '../Modal';
import { ThreeCircles } from 'react-loader-spinner';
import { Button } from '../Button';
import { toast } from 'react-toastify';
import { fetchImages } from 'components/api';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    searchRequest: null,
    images: [],
    activImage: null,
    showModal: false,
    page: 1,
    loading: false,
    disableButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchRequest;
    const nextName = this.props.searchRequest;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ loading: true, page: 1 });
      fetchImages(nextName, 1)
        .then(res => {
          if (!res.ok) {
            return Promise.reject(new Error(`Not found`));
          }
          return res.json();
        })
        .then(({ hits, totalHits }) => {
          if (hits.length) {
            toast.info(`We found ${totalHits} results`);
            this.setState({
              images: [...hits],
            });
          } else {
            toast.error('Sorry, there are no results');
          }
        })
        .catch(err => alert(err.message))
        .finally(() => this.setState({ loading: false }));
    } else if (
      nextPage !== prevState.page &&
      prevName === nextName &&
      nextPage !== 1
    ) {
      this.setState({ loading: true });
      fetchImages(nextName, nextPage)
        .then(res => {
          if (!res.ok) {
            return Promise.reject(new Error(`Not found`));
          }
          return res.json();
        })
        .then(({ hits }) => {
          if (hits.length) {
            this.setState({
              images: [...this.state.images, ...hits],
            });
          } else {
            this.setState({
              disableButton: true,
            });
            toast.error('Sorry, there are no results');
          }
        })
        .catch(err => console(err.message))
        .finally(() => this.setState({ loading: false }));
    }
    return;
  }

  handleClickMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onImageClick = index => {
    console.dir(index);
    this.setState({ activImage: index });
    this.togleModal();
  };

  render() {
    const { showModal, images, activImage, loading, disableButton } =
      this.state;

    return (
      <>
        {showModal && (
          <Modal onClose={this.togleModal}>
            <img src={images[activImage].largeImageURL} alt=""></img>
          </Modal>
        )}
        <List>
          {images.length > 0 &&
            images.map(({ id, webformatURL }, index) => (
              <ImageGalleryItem
                key={id}
                onClick={() => this.onImageClick(index)}
                webformatURL={webformatURL}
              />
            ))}
        </List>{' '}
        {loading && (
          <ThreeCircles
            height="100"
            width="100"
            color="#4d80a9"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        )}
        {images.length > 0 && (
          <Button
            onClick={this.handleClickMore}
            disableButton={disableButton}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchRequest: PropTypes.string.isRequired,
};
