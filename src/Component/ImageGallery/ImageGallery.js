import React from "react";
import style from "./style.Module.css";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ images, onClick }) => (
  <ul className={style.ImageGallery} onClick={onClick}>
    {images.map(({ id, webformatURL, tags, LargeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        LargeImageURL={LargeImageURL}
      />
    ))}
  </ul>
);

export default ImageGallery;
