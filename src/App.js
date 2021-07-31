import React, { Component } from "react";
import SearchBar from "./Component/Searchbar";
import Container from "./Component/Container";
import ImageGallery from "./Component/ImageGallery";
import Buttom from "./Component/Button/Button";
import api from "./Servise/FetchImage";
import Modal from "./Component/Modal";
import ImageLoader from "./Component/Loader";

// import style from "./style.css";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    showModal: false,
    url: "",
    tag: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { quary } = this.state;
    if (quary !== prevState.quary) {
      this.FetchImage()
        .catch((error) => this.setState({ error }))
        .finaly(() => this.setState({ isLoading: false }));
    }
  }

  fetchImage = () => {
    const { quary, page } = this.state;
    this.setState({ isLoading: true });
    return api.findImage(quary, page).then((images) => {
      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
      }));
    });
  };

  handleOnButtonClick = () => {
    this.fetchImage()
      .then(() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      )
      .catch((error) => alert(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormaData = ({ query }) => {
    this.setState({
      page: 1,
      query,
      images: [],
    });
  };

  handleImageClick = ({ target }) => {
    if (target.nodeName !== "IMG") {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    this.setState({
      url,
      tag,
      isLoading: true,
    });
    this.toggleModal();
  };

  toggleModal = () =>
    this.setState((prevState) => ({ showModal: !prevState.showModal }));

  hideLoaderInModal = () => this.setState({ isLoading: false });

  render() {
    const { images, isLoading, showModal, url, tag } = this.state;
    const showMoreButton = isLoading && !showModal;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
            {isLoading && <ImageLoader />}
            <img src={url} alt={tag} onLoad={this.hideLoaderInModal} />
          </Modal>
        )}
        <SearchBar onSubmit={this.handleFormaData} />
        <ImageGallery images={images} onClick={this.handleImageClick} />
        {showMoreButton && images.length !== 0 && <ImageLoader />}
        {!isLoading && images[0] && (
          <Buttom onClick={this.handleOnButtonClick} />
        )}
      </Container>
    );
  }
}

export default App;
