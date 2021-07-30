import React, { Component } from "react";
import SearchForm from "./Component/Searchbar";
import Container from "./Component/Container";
import ImageGallery from "./Component/ImageGallery";
import ImageGalleryItem from "./Component/ImageGalleryItem";
import style from "./style.css";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    // showModal: false,
    url: "",
    tag: "",
  };

  render() {
    return (
      <Container>
        <SearchForm />
        <ImageGallery />
        <ImageGalleryItem />
      </Container>
    );
  }
}

export default App;
