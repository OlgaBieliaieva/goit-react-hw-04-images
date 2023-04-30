import shortid from 'shortid';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ list, showModal }) {
  return (
    <>
      {list.map(({ webformatURL, largeImageURL, tags }) => {
        const id = shortid.generate();
        return (
          <li className={css.ImageGalleryItem} key={id}>
            <img
              className={css.ImageGalleryItemImage}
              src={webformatURL}
              alt={tags}
              srcSet={largeImageURL}
              onClick={showModal}
            ></img>
          </li>
        );
      })}
    </>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showModal: PropTypes.func.isRequired,
};
