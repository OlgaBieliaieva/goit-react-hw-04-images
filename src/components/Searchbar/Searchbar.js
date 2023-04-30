import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { IconContext } from 'react-icons';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const { value } = e.target;

    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault(e);

    onSubmit(value);
    reset();
  };

  const reset = () => {
    setValue('');
  };

  return (
    <section className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <IconContext.Provider value={{ size: '2em' }}>
            <ImSearch />
          </IconContext.Provider>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          value={value}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </section>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
