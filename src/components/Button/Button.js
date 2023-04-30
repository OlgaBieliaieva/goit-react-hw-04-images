import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ page, onChangePage, isActive }) {
  return (
    <button
      className={css.Button}
      type="button"
      value={page}
      onClick={onChangePage}
      disabled={isActive}
    >
      Load more
    </button>
  );
}
export default Button;

Button.propTypes = {
  page: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
