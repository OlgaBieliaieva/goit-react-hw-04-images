import { useReducer, useEffect } from 'react';
import { FcBinoculars } from 'react-icons/fc';
import { IconContext } from 'react-icons';
// import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import getImages from 'services/api';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function countReducer(state, action) {
  switch (action.type) {
    case 'changeQuery':
      return {
        ...state,
        images: action.payload.images,
        page: action.payload.page,
        status: action.payload.status,
        disabled: action.payload.disabled,
      };

    case 'changePage':
      return {
        ...state,
        page: action.payload.page,
      };

    case 'onePage':
      return {
        ...state,
        images: action.payload.images,
        status: action.payload.status,
        disabled: action.payload.disabled,
      };

    case 'multiplePage':
      return {
        ...state,
        images: action.payload.images,
        status: action.payload.status,
      };

    case 'lastPage':
      return {
        ...state,
        images: action.payload.images,
        status: action.payload.status,
        disabled: action.payload.disabled,
      };

    case 'nextPage':
      return {
        ...state,
        images: action.payload.images,
        status: action.payload.status,
      };

    case 'modal':
      return { ...state, modal: action.payload.modal };

    case 'modalImg':
      return { ...state, modalImg: action.payload.modalImg };

    case 'reject':
      return { ...state, status: action.payload.status };

    case 'error':
      return {
        ...state,
        error: action.payload.error,
        status: action.payload.status,
      };

    default:
      return;
  }
}

export default function ImageGallery({ query }) {
  const [state, dispatch] = useReducer(countReducer, {
    images: [],
    modalImg: '',
    page: 1,
    error: '',
    status: Status.IDLE,
    disabled: false,
    showModal: false,
  });

  const { images, modalImg, page, error, status, disabled, showModal } = state;

  useEffect(() => {
    if (!query) {
      return;
    }

    dispatch({
      type: 'changeQuery',
      payload: {
        images: [],
        page: 1,
        status: Status.PENDING,
        disabled: false,
      },
    });

    getImages(query, 1)
      .then(images => {
        if (images.data.totalHits === 0) {
          return dispatch({
            type: 'reject',
            payload: { status: Status.REJECTED },
          });
          // this.setState({
          //   status: Status.REJECTED,
          // });
        }
        if (images.data.hits.length === images.data.totalHits) {
          return dispatch({
            type: 'onePage',
            payload: {
              images: [...images.data.hits],
              status: Status.RESOLVED,
              disabled: true,
            },
          });

          // this.setState({
          //   images: [...images.data.hits],

          //   status: Status.RESOLVED,
          //   disabled: true,
          // });
        }
        return dispatch({
          type: 'multiplePage',
          payload: { images: [...images.data.hits], status: Status.RESOLVED },
        });
        // this.setState({
        //   images: [...images.data.hits],

        //   status: Status.RESOLVED,
        // });
      })
      .catch(error =>
        dispatch({
          type: 'error',
          payload: { error: error, status: Status.REJECTED },
        })
      );
    // this.setState({ error, status: Status.REJECTED }));
    return;
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    getImages(query, page)
      .then(response => {
        if (
          images.length + response.data.hits.length ===
          response.data.totalHits
        ) {
          return dispatch({
            type: 'lastPage',
            payload: {
              images: [...images, ...response.data.hits],
              status: Status.RESOLVED,
              disabled: true,
            },
          });
          // this.setState(prevState => ({
          //   images: [...prevState.images, ...images.data.hits],
          //   status: Status.RESOLVED,
          //   disabled: true,
          // }));
        }

        return dispatch({
          type: 'nextPage',
          payload: {
            images: [...images, ...response.data.hits],
            status: Status.RESOLVED,
          },
        });
        // this.setState(prevState => ({
        //   images: [...prevState.images, ...images.data.hits],
        //   status: Status.RESOLVED,
        // })
        // );
      })
      .catch(error =>
        dispatch({
          type: 'error',
          payload: { error: error, status: Status.REJECTED },
        })
      );

    // this.setState({ error, status: Status.REJECTED }));
  }, [page]);

  const handleChangePage = e => {
    return dispatch({
      type: 'changePage',
      payload: { page: Number(e.target.value) + 1 },
    });
    // this.setState(prevState => {
    //   return { page: prevState.page + 1 };
    // });
  };

  const toggleModal = e => {
    dispatch({
      type: 'modal',
      payload: { showModal: !showModal },
    });

    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));

    if (e && e.target.srcset) {
      dispatch({
        type: 'modalImg',
        payload: { modalImg: e.target.srcset },
      });
      // this.setState({
      //   modalImg: e.target.srcset,
      // });
    }
  };

  if (status === 'idle') {
    return (
      <section className={css.Idle}>
        <div>
          <h3>Start your search right now...</h3>
          <IconContext.Provider value={{ size: '7em' }}>
            <FcBinoculars />
          </IconContext.Provider>
        </div>
      </section>
    );
  }

  if (status === 'pending') {
    return (
      <section className={css.Pending}>
        <Loader />
      </section>
    );
  }

  if (status === 'rejected') {
    return (
      <section className={css.Rejected}>
        <p>Sorry, we didn't find the information you requested...</p>
      </section>
    );
  }

  if (status === 'resolved') {
    return (
      <section className={status}>
        <ul className={css.ImageGallery}>
          <ImageGalleryItem list={images} showModal={toggleModal} />
        </ul>
        <Button
          page={page}
          onChangePage={handleChangePage}
          isActive={disabled}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImg} onClick={toggleModal} alt="large"></img>
          </Modal>
        )}
      </section>
    );
  }
}

// class ImageGallery extends Component {
//   static propTypes = {
//     query: PropTypes.string.isRequired,
//   };

//   state = {
//     images: [],
//     modalImg: '',
//     page: 1,

//     status: Status.IDLE,
//     disabled: false,
//     showModal: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.query;
//     const nextQuery = this.props.query;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevQuery !== nextQuery) {
//       this.setState({
//         images: [],
//         page: 1,

//         status: Status.PENDING,
//         disabled: false,
//       });

//       getImages(nextQuery, 1)
//         .then(images => {
//           if (images.data.totalHits === 0) {
//             return this.setState({
//               status: Status.REJECTED,
//             });
//           }
//           if (images.data.hits.length === images.data.totalHits) {
//             return this.setState({
//               images: [...images.data.hits],

//               status: Status.RESOLVED,
//               disabled: true,
//             });
//           }
//           return this.setState({
//             images: [...images.data.hits],

//             status: Status.RESOLVED,
//           });
//         })
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//       return;
//     }

//     if (prevPage !== nextPage && nextPage !== 1) {
//       this.setState({ status: Status.PENDING });

//       getImages(nextQuery, nextPage)
//         .then(images => {
//           if (
//             this.state.images.length + images.data.hits.length ===
//             images.data.totalHits
//           ) {
//             return this.setState(prevState => ({
//               images: [...prevState.images, ...images.data.hits],
//               status: Status.RESOLVED,
//               disabled: true,
//             }));
//           }

//           return this.setState(prevState => ({
//             images: [...prevState.images, ...images.data.hits],
//             status: Status.RESOLVED,
//           }));
//         })
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }
//   }

//   handleChangePage = e => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   toggleModal = e => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));

//     if (e && e.target.srcset) {
//       this.setState({
//         modalImg: e.target.srcset,
//       });
//     }
//   };

//   render() {
//     const { images, modalImg, page, status, disabled, showModal } = this.state;

//     if (status === 'idle') {
//       return (
//         <section className={css.Idle}>
//           <div>
//             <h3>Start your search right now...</h3>
//             <IconContext.Provider value={{ size: '10em' }}>
//               <FcBinoculars />
//             </IconContext.Provider>
//           </div>
//         </section>
//       );
//     }

//     if (status === 'pending') {
//       return (
//         <section className={css.Pending}>
//           <Loader />
//         </section>
//       );
//     }

//     if (status === 'rejected') {
//       return (
//         <section className={css.Rejected}>
//           <p>Sorry, we didn't find the information you requested...</p>
//         </section>
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <section className={status}>
//           <ul className={css.ImageGallery}>
//             <ImageGalleryItem list={images} showModal={this.toggleModal} />
//           </ul>
//           <Button
//             page={page}
//             onChangePage={this.handleChangePage}
//             isActive={disabled}
//           />
//           {showModal && (
//             <Modal onClose={this.toggleModal}>
//               <img src={modalImg} onClick={this.toggleModal} alt="large"></img>
//             </Modal>
//           )}
//         </section>
//       );
//     }
//   }
// }
// export default ImageGallery;
