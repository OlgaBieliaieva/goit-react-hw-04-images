import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { IconContext } from 'react-icons';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState({ value: value });
  };

  handleSubmit = e => {
    e.preventDefault(e);

    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <section className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button className={css.SearchFormButton} type="submit">
            <IconContext.Provider value={{ size: '2em' }}>
              <ImSearch />
            </IconContext.Provider>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </section>
    );
  }
}
export default Searchbar;
